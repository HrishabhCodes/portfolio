/**
 * Build-time writing feed. Pure fetch logic (no Astro imports) so the snapshot
 * script can run it directly.
 *
 * - Medium: auto-discovered from the public RSS feed.
 * - X: text + date from the public oEmbed endpoint, per URL.
 * - LinkedIn: text, date, thumbnail and reactions from the public post page's JSON-LD.
 */

export type Platform = "medium" | "x" | "linkedin";

export type Post = {
  platform: Platform;
  url: string;
  /** The URL as written in data/writing.ts, used to match snapshot entries. */
  source?: string;
  /** ISO date */
  date: string;
  title?: string;
  text: string;
  image?: string;
  tags?: string[];
  readingMinutes?: number;
  likes?: number;
  comments?: number;
};

/** Manual entry: just a URL; anything else overrides fetched values. */
export type PostInput = { url: string } & Partial<Omit<Post, "url">>;

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

export function platformOf(url: string): Platform {
  const host = new URL(url).hostname.replace(/^www\./, "");
  if (host === "x.com" || host === "twitter.com") return "x";
  if (host.endsWith("linkedin.com")) return "linkedin";
  if (host.endsWith("medium.com")) return "medium";
  throw new Error(`Unsupported writing URL: ${url}`);
}

async function getText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow", signal: AbortSignal.timeout(12_000) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", mdash: "—", ndash: "–", hellip: "…", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };

function decode(s: string): string {
  // LinkedIn double-encodes some entities (&amp;#39;), so decode until stable.
  for (let i = 0; i < 3; i++) {
    const next = s
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
      .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
    if (next === s) break;
    s = next;
  }
  return s;
}

function stripHtml(html: string): string {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|h\d|li|figure|blockquote)>/gi, "\n\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function excerpt(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 20)).trimEnd() + "…";
}

export async function fetchMedium(handle: string): Promise<Post[]> {
  const xml = await getText(`https://medium.com/feed/@${handle}`);
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  const cdata = (s: string | undefined) => (s ?? "").replace(/^<!\[CDATA\[|\]\]>$/g, "");
  const tag = (item: string, name: string) => cdata(item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1]);

  return items.map((item) => {
    const content = tag(item, "content:encoded");
    // First block of the body is usually the title repeated, then the cover image.
    const body = stripHtml(content.replace(/<h3[^>]*>[\s\S]*?<\/h3>/, "").replace(/<figure[\s\S]*?<\/figure>/g, ""));
    const words = body.split(/\s+/).filter(Boolean).length;
    const link = tag(item, "link").split("?")[0];
    return {
      platform: "medium" as const,
      url: link,
      date: new Date(tag(item, "pubDate")).toISOString(),
      title: decode(tag(item, "title")),
      text: excerpt(body, 320),
      image: content.match(/<img[^>]+src="([^"]+)"/)?.[1],
      tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => cdata(m[1])).slice(0, 3),
      readingMinutes: Math.max(1, Math.round(words / 230)),
    };
  });
}

export async function fetchX(url: string): Promise<Post> {
  const tweetUrl = url.replace("://x.com/", "://twitter.com/");
  const json = JSON.parse(await getText(`https://publish.twitter.com/oembed?omit_script=1&dnt=true&url=${encodeURIComponent(tweetUrl)}`)) as { html: string; url: string };
  const p = json.html.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "";
  // Hashtags become tags; media and t.co links are dropped from the excerpt.
  const tags = [...p.matchAll(/<a[^>]*\/hashtag\/[^>]*>#(\w+)<\/a>/g)].map((m) => m[1].toLowerCase());
  const text = stripHtml(
    p
      .replace(/<a[^>]*\/hashtag\/[^>]*>#\w+<\/a>/g, "")
      .replace(/<a[^>]*>pic\.twitter\.com\/\w+<\/a>/g, "")
      .replace(/<a[^>]*>(https?:\/\/t\.co\/\w+)<\/a>/g, ""),
  ).replace(/[ \t]+$/gm, "");
  const dateText = json.html.match(/<a[^>]*>([A-Z][a-z]+ \d{1,2}, \d{4})<\/a>\s*<\/blockquote>/)?.[1];
  if (!dateText) throw new Error(`No date in oEmbed for ${url}`);
  return {
    platform: "x",
    url: json.url.split("?")[0],
    date: new Date(`${dateText} 12:00 UTC`).toISOString(),
    text,
    ...(tags.length && { tags: tags.slice(0, 3) }),
  };
}

export async function fetchLinkedIn(url: string): Promise<Post> {
  const html = await getText(url);
  type LD = { datePublished?: string; description?: string; articleBody?: string; name?: string; headline?: string; thumbnailUrl?: string; image?: unknown; interactionStatistic?: { interactionType: string; userInteractionCount: number }[] };
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try { return JSON.parse(m[1]) as LD; } catch { return {} as LD; }
  });
  const ld = blocks.find((b) => b.datePublished) ?? {};
  const og = (p: string) => html.match(new RegExp(`<meta property="og:${p}" content="([^"]*)"`))?.[1];
  const text = decode(ld.description ?? ld.articleBody ?? og("description") ?? "");
  if (!ld.datePublished || !text) throw new Error(`No post data on ${url}`);
  const count = (kind: string) => ld.interactionStatistic?.find((s) => s.interactionType.includes(kind))?.userInteractionCount;
  const title = decode(ld.name ?? og("title") ?? "").split(" | ")[0];
  return {
    platform: "linkedin",
    url: decode(og("url") ?? url),
    date: new Date(ld.datePublished).toISOString(),
    title: title && !text.startsWith(title) ? title : undefined,
    text: excerpt(text, 600),
    image: ld.thumbnailUrl ?? decode(og("image") ?? "") ?? undefined,
    likes: count("Like"),
    comments: count("Comment"),
  };
}

export async function fetchPost(input: PostInput): Promise<Post> {
  const platform = input.platform ?? platformOf(input.url);
  const fetched = platform === "x" ? await fetchX(input.url) : platform === "linkedin" ? await fetchLinkedIn(input.url) : undefined;
  const base = fetched ?? { platform, url: input.url, date: input.date ?? "", text: input.text ?? "" };
  return { ...base, ...input, platform, url: fetched?.url ?? input.url, source: input.url };
}

/** Newest first, de-duplicated by URL (manual entries win over feed items). */
export function mergePosts(manual: Post[], feed: Post[]): Post[] {
  const seen = new Set(manual.map((p) => p.url));
  return [...manual, ...feed.filter((p) => !seen.has(p.url))].sort((a, b) => b.date.localeCompare(a.date));
}

/** LinkedIn's official embed URL, derived from the activity id in any post URL. */
export function linkedInEmbedUrl(post: Pick<Post, "url" | "source">): string | undefined {
  const id = `${post.source ?? ""} ${post.url}`.match(/activity[:-](\d{10,})/)?.[1];
  return id && `https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}?collapsed=1`;
}
