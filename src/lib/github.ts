/**
 * Build-time GitHub data. Pure fetch logic (no Astro imports) so the snapshot
 * script can run it directly with `node --experimental-strip-types`.
 *
 * With GITHUB_TOKEN: one GraphQL call (repos + exact contribution calendar).
 * Without: public REST + a public contributions mirror. Callers fall back to
 * the committed snapshot if both fail.
 */

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type GitHubData = {
  username: string;
  fetchedAt: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  contributions: { total: number; days: ContributionDay[] };
  recent: Repo[];
};

const RECENT_COUNT = 6;

function summarize(username: string, repos: Repo[], extra: Pick<GitHubData, "publicRepos" | "followers" | "contributions">): GitHubData {
  const own = repos.filter((r) => r.name.toLowerCase() !== username.toLowerCase());
  // Languages of recently active repos reflect current work better than all-time counts.
  const yearAgo = new Date(Date.now() - 365 * 24 * 3600 * 1000).toISOString();
  const active = own.filter((r) => r.pushedAt >= yearAgo);
  const langCounts = new Map<string, number>();
  for (const r of active.length ? active : own) if (r.language) langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
  return {
    username,
    fetchedAt: new Date().toISOString(),
    totalStars: own.reduce((n, r) => n + r.stars, 0),
    topLanguages: [...langCounts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 4),
    recent: [...own].sort((a, b) => b.pushedAt.localeCompare(a.pushedAt)).slice(0, RECENT_COUNT),
    ...extra,
  };
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return (await res.json()) as T;
}

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4,
};

async function viaGraphQL(username: string, token: string): Promise<GitHubData> {
  const query = `query($login: String!) {
    user(login: $login) {
      followers { totalCount }
      repositories(ownerAffiliations: OWNER, privacy: PUBLIC, first: 100, orderBy: {field: PUSHED_AT, direction: DESC}) {
        totalCount
        nodes { name description url stargazerCount pushedAt isFork primaryLanguage { name } }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`;
  type Node = { name: string; description: string | null; url: string; stargazerCount: number; pushedAt: string; isFork: boolean; primaryLanguage: { name: string } | null };
  type Resp = { data?: { user: {
    followers: { totalCount: number };
    repositories: { totalCount: number; nodes: Node[] };
    contributionsCollection: { contributionCalendar: { totalContributions: number; weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[] } };
  } }; errors?: unknown };
  const json = await getJson<Resp>("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: username } }),
  });
  if (!json.data) throw new Error(`GraphQL error: ${JSON.stringify(json.errors)}`);
  const u = json.data.user;
  const cal = u.contributionsCollection.contributionCalendar;
  return summarize(
    username,
    u.repositories.nodes.filter((n) => !n.isFork).map((n) => ({
      name: n.name, description: n.description, url: n.url, language: n.primaryLanguage?.name ?? null, stars: n.stargazerCount, pushedAt: n.pushedAt,
    })),
    {
      publicRepos: u.repositories.totalCount,
      followers: u.followers.totalCount,
      contributions: {
        total: cal.totalContributions,
        days: cal.weeks.flatMap((w) => w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVELS[d.contributionLevel] ?? 0 }))),
      },
    },
  );
}

async function viaREST(username: string): Promise<GitHubData> {
  type User = { public_repos: number; followers: number };
  type RestRepo = { name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; pushed_at: string; fork: boolean };
  type Contrib = { total: { lastYear: number }; contributions: ContributionDay[] };
  const headers = { Accept: "application/vnd.github+json" };
  const [user, repos, contrib] = await Promise.all([
    getJson<User>(`https://api.github.com/users/${username}`, { headers }),
    getJson<RestRepo[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { headers }),
    getJson<Contrib>(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
  ]);
  return summarize(
    username,
    repos.filter((r) => !r.fork).map((r) => ({
      name: r.name, description: r.description, url: r.html_url, language: r.language, stars: r.stargazers_count, pushedAt: r.pushed_at,
    })),
    {
      publicRepos: user.public_repos,
      followers: user.followers,
      contributions: { total: contrib.total.lastYear, days: contrib.contributions },
    },
  );
}

export async function fetchGitHubData(username: string, token = process.env.GITHUB_TOKEN): Promise<GitHubData> {
  return token ? viaGraphQL(username, token) : viaREST(username);
}
