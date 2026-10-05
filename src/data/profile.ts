import { yearsLabel } from "../lib/years";

const years = yearsLabel();

export const profile = {
  name: "Hrishabh Jain",
  givenName: "Hrishabh",
  familyName: "Jain",
  handle: "HrishabhCodes",
  jobTitle: "AI Engineer",
  tagline: "AI Engineer building multi-agent systems and RAG pipelines",
  email: "hrishabh507@gmail.com",
  url: "https://hrishabh.in",
  location: {
    city: "Bengaluru",
    region: "Karnataka",
    country: "India",
    countryCode: "IN",
    timezone: "IST",
  },
  now: { company: "CambrianEdge.ai", url: "https://cambrianedge.ai" },
  focus: "Multi-agent systems & RAG",
  heroLine: "I build multi-agent systems, RAG pipelines and the backends behind them, and make sure they actually hold up in production.",
  years,
};

/** Search/share snippet: first person and plain, like most AI engineers' sites (~155 chars). */
export const metaDescription = "I build AI agents and RAG systems that hold up in production, with the evals and observability to prove it. AI Engineer at CambrianEdge.ai, Bengaluru.";

/** Third-person entity statement for JSON-LD and llms.txt, which answer engines quote as fact. */
export const bio = `Hrishabh Jain is an AI Engineer in Bengaluru, India, building AI agents, RAG pipelines, evals and observability for production AI at CambrianEdge.ai. ${years} years shipping production software.`;

/**
 * The intro paragraph. Inline markup is intentional: <mark> = accent highlight,
 * <strong> = emphasis. Authored here, rendered with set:html, stripped for text.
 */
export const introHtml = `Hey, I'm <strong>Hrishabh Jain</strong>, an <mark>AI engineer in Bengaluru</mark> who teaches LLMs to show up to work on time. At <strong>CambrianEdge.ai</strong> I own the <mark>multi-agent AI core</mark>: 10+ agents that plan, research and write together under a supervisor that's honestly stricter than most managers. I build <mark>RAG pipelines</mark> that cite their sources instead of making things up, <strong>MCP integrations</strong> that let agents use real tools, and the <strong>TypeScript / MERN</strong> backend plumbing that keeps it all fast. I once cut response latency by ~40% just by convincing the platform it didn't need the biggest model for everything. Before that I was at <strong>Gutenberg</strong>, turning piles of RFPs into something you could just ask questions to. Basically, I take AI ideas out of demo-land and into production. Off the clock, I've solved 250+ LeetCode problems and will happily argue that a smaller model would've done the job.`;

export const introText = introHtml.replace(/<[^>]+>/g, "");

export const facts = [
  { value: years, unit: "yrs", label: "Shipping production software" },
  { value: "10+", unit: "agents", label: "Orchestrated in production" },
  { value: "250+", unit: "solved", label: "DSA problems on LeetCode" },
];

export const socials = [
  { name: "GitHub", href: "https://github.com/HrishabhCodes" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/hrishabh-jain/" },
  { name: "X", href: "https://x.com/hrishabh_hj" },
  { name: "LeetCode", href: "https://leetcode.com/u/HrishabhCodes" },
];

/** Plain-language Q&A. Rendered visibly and as FAQPage JSON-LD. */
export const faq = [
  {
    q: "Who is Hrishabh Jain?",
    a: `Hrishabh Jain is an AI Engineer based in Bengaluru, India, with ${years} years of experience building production software. He currently works at CambrianEdge.ai, where he architects and owns the platform's multi-agent AI core.`,
  },
  {
    q: "What does Hrishabh Jain work on?",
    a: "He builds production-grade AI systems: multi-agent orchestration with 10+ agents in a supervisor pattern, retrieval-augmented generation (RAG) pipelines with LlamaIndex and LlamaParse, Model Context Protocol (MCP) integrations, and real-time token streaming. He also benchmarks LLM selection, which cut end-to-end latency by about 40%.",
  },
  {
    q: "What is Hrishabh Jain's tech stack?",
    a: "TypeScript and the MERN stack (MongoDB, Express, React, Node.js) are his foundation, extended into AI with Mastra, MCP, Vercel AI SDK, LlamaIndex, LangChain, Pinecone and OpenAI APIs. For infrastructure he uses Redis, BullMQ, GraphQL, Docker, AWS and Azure.",
  },
  {
    q: "Where did Hrishabh Jain study?",
    a: "He holds a B.Tech in Computer Science from Amity University Rajasthan, Jaipur (2020–2024), graduating with a CGPA of 8.45. He is also a Google Generative AI Leader certified professional.",
  },
  {
    q: "How can I contact Hrishabh Jain?",
    a: "Email hrishabh507@gmail.com, or reach him on LinkedIn (linkedin.com/in/hrishabh-jain) or X (@hrishabh_hj).",
  },
];
