// Refresh the committed writing fallback snapshot: `bun run writing:snapshot`
import { writeFile } from "node:fs/promises";
import { fetchMedium, fetchPost, mergePosts } from "../src/lib/writing.ts";
import { mediumHandle, posts } from "../src/data/writing.ts";

const manual = await Promise.all(posts.map(fetchPost));
const medium = await fetchMedium(mediumHandle);
const all = mergePosts(manual, medium);
await writeFile(
  new URL("../src/data/writing-snapshot.json", import.meta.url),
  JSON.stringify({ fetchedAt: new Date().toISOString(), posts: all }, null, 2) + "\n",
);
console.log(`snapshot: ${all.length} posts (${medium.length} from Medium)`);
