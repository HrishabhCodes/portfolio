import { fetchMedium, fetchPost, mergePosts, type Post } from "./writing";
import { mediumHandle, posts } from "../data/writing";
import snapshot from "../data/writing-snapshot.json";

const snapshotBySource = new Map((snapshot.posts as Post[]).map((p) => [p.source ?? p.url, p]));
let cached: Promise<Post[]> | undefined;

/** Live data at build time; each source falls back to the committed snapshot on its own. */
export function getPosts(): Promise<Post[]> {
  cached ??= (async () => {
    const manual = await Promise.all(
      posts.map((input) =>
        fetchPost(input).catch((err) => {
          const hit = snapshotBySource.get(input.url);
          console.warn(`[writing] ${input.url}: ${err}${hit ? " (using snapshot)" : " (skipped)"}`);
          return hit ? { ...hit, ...input, url: hit.url } : undefined;
        }),
      ),
    );
    const medium = await fetchMedium(mediumHandle).catch((err) => {
      console.warn(`[writing] Medium feed: ${err} (using snapshot)`);
      return (snapshot.posts as Post[]).filter((p) => p.platform === "medium");
    });
    return mergePosts(manual.filter((p): p is Post => !!p), medium);
  })();
  return cached;
}

export const PLATFORM_LABEL: Record<Post["platform"], string> = {
  medium: "Medium",
  x: "X",
  linkedin: "LinkedIn",
};
