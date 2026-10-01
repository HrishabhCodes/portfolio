import type { PostInput } from "../lib/writing";

/** Medium articles are pulled automatically from this account's RSS feed. */
export const mediumHandle = "HrishabhCodes";

/**
 * X and LinkedIn posts (and any Medium article you want to pin). Just paste the
 * URL; text, date and images are fetched at build time. Any field you add here
 * (title, text, image, date) overrides what was fetched.
 */
export const posts: PostInput[] = [
  { url: "https://x.com/hrishabh_hj/status/2103469380017492453" },
  { url: "https://www.linkedin.com/feed/update/urn:li:activity:7509229400853254144/" },
];
