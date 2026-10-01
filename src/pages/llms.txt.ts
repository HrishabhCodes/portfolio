import type { APIRoute } from "astro";
import { profile, metaDescription, introText, socials, faq } from "../data/profile";
import { experience, formatMonth } from "../data/experience";
import { projects } from "../data/projects";
import { stack } from "../data/stack";
import { education, certifications } from "../data/education";

/** llms.txt (https://llmstxt.org): a plain-markdown summary for AI answer engines. */
export const GET: APIRoute = () => {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${metaDescription}`,
    "",
    introText,
    "",
    "## Quick facts",
    `- Role: ${profile.jobTitle} at ${profile.now.company}`,
    `- Location: ${profile.location.city}, ${profile.location.region}, ${profile.location.country}`,
    `- Experience: ${profile.years} years`,
    `- Focus: ${profile.focus}`,
    `- Email: ${profile.email}`,
    `- Website: ${profile.url}`,
    "",
    "## Experience",
    ...experience.flatMap((r) => [
      `### ${r.title}, ${r.company} (${formatMonth(r.start)} – ${r.end ? formatMonth(r.end) : "Present"})`,
      `${r.type} · ${r.location}. ${r.summary}`,
      ...[...r.highlights, ...(r.more ?? [])].map((h) => `- ${h}`),
      "",
    ]),
    "## Projects",
    ...projects.map((p) => `- ${p.name} (${p.year}): ${p.description} Built with ${p.stack.join(", ")}.`),
    "",
    "## Skills",
    ...stack.map((s) => `- ${s.group}: ${s.items.join(", ")}`),
    "",
    "## Education",
    `- ${education.degree}, ${education.school}, ${education.city} (${education.start}–${education.end}), ${education.grade}`,
    ...certifications.map((c) => `- Certification: ${c.name}${c.issuer ? ` (${c.issuer})` : ""}`),
    "",
    "## FAQ",
    ...faq.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Links",
    ...socials.map((s) => `- [${s.name}](${s.href})`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
