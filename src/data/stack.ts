export const stack = [
  {
    group: "Gen AI",
    note: "Agents, retrieval, orchestration",
    items: ["Mastra", "MCP", "Agent Skills", "Multi-Agent Systems", "RAG", "Context Engineering", "Agentic Memory", "Vercel AI SDK", "LlamaIndex", "LlamaParse", "LangChain", "OpenAI APIs"],
  },
  {
    group: "Backend",
    note: "APIs and the plumbing behind them",
    items: ["Node.js", "Express", "REST APIs", "Apollo GraphQL", "WebSockets", "BullMQ"],
  },
  {
    group: "Frontend",
    note: "When the agents need a face",
    items: ["React", "Next.js", "Redux", "Zustand", "Tailwind CSS"],
  },
  {
    group: "Data & Cloud",
    note: "Where things live",
    items: ["MongoDB", "Redis", "Pinecone", "Neo4j", "Firebase", "Docker", "AWS", "Azure"],
  },
  {
    group: "Languages",
    note: "Daily drivers first",
    items: ["TypeScript", "JavaScript", "Python", "Java"],
  },
  {
    group: "Fundamentals",
    note: "What everything else is built on",
    items: ["DSA", "System Design", "DBMS", "OOP", "Operating Systems", "Computer Networks", "Git"],
  },
];

/** Flat, de-duplicated list for JSON-LD knowsAbout. */
export const allSkills = [...new Set(stack.flatMap((s) => s.items))];
