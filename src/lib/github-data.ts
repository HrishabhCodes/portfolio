import { fetchGitHubData, type GitHubData } from "./github";
import snapshot from "../data/github-snapshot.json";

let cached: Promise<GitHubData> | undefined;

/** Live data at build time, falling back to the committed snapshot. Memoized per build. */
export function getGitHubData(): Promise<GitHubData> {
  cached ??= fetchGitHubData(snapshot.username).catch((err) => {
    console.warn(`[github] live fetch failed, using snapshot from ${snapshot.fetchedAt}: ${err}`);
    return snapshot as GitHubData;
  });
  return cached;
}
