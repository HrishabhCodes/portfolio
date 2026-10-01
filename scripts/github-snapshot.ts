// Refresh the committed fallback snapshot: `bun run github:snapshot`
import { writeFile } from "node:fs/promises";
import { fetchGitHubData } from "../src/lib/github.ts";

const data = await fetchGitHubData("HrishabhCodes");
await writeFile(new URL("../src/data/github-snapshot.json", import.meta.url), JSON.stringify(data, null, 2) + "\n");
console.log(`snapshot: ${data.publicRepos} repos, ${data.contributions.total} contributions`);
