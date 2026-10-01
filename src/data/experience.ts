export type Role = {
  title: string;
  company: string;
  companyNote?: string;
  companyUrl?: string;
  type: "Full-time" | "Internship";
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or undefined for current */
  end?: string;
  location: string;
  summary: string;
  highlights: string[];
  more?: string[];
  skills: string[];
};

export const experience: Role[] = [
  {
    title: "AI Engineer",
    company: "CambrianEdge.ai",
    companyNote: "a Gutenberg venture",
    companyUrl: "https://cambrianedge.ai",
    type: "Full-time",
    start: "2025-01",
    location: "Remote",
    summary:
      "Own the multi-agent AI core of a production AI marketing platform for autonomous content generation and workflow automation.",
    highlights: [
      "Architected a multi-agent system on Mastra with 10+ agents in a supervisor pattern, handling task decomposition, research workflows and autonomous execution.",
      "Built MCP (Model Context Protocol) integrations and reusable agent skills so agents can securely call external tools, APIs and data sources with structured outputs.",
      "Designed advanced RAG pipelines with LlamaIndex and LlamaParse: multimodal, layout-aware ingestion, semantic retrieval and context injection that cut hallucinations.",
      "Benchmarked LLM selection across the platform, swapping oversized models for task-appropriate ones and cutting end-to-end latency by ~40%.",
    ],
    more: [
      "Built the agent orchestration layer that manages prompt routing, memory, tool usage and execution order for multi-step reasoning.",
      "Engineered LLM execution pipelines tuned for latency, cost and reliability across streaming and batch generation, plus real-time token streaming for long-form content.",
      "Added prompt abstraction and versioning so the team can experiment fast while keeping production behaviour reproducible.",
      "Designed MongoDB schemas, indexes and aggregations for high-throughput AI workloads.",
      "Secured REST and GraphQL APIs with enterprise-grade authentication, authorization and abuse prevention.",
      "Used Redis caching and BullMQ queues for event-driven, fault-tolerant execution of long-running AI jobs.",
    ],
    skills: ["Mastra", "MCP", "LlamaIndex", "TypeScript", "MongoDB", "Redis", "BullMQ", "GraphQL"],
  },
  {
    title: "Full-Stack Developer",
    company: "Gutenberg",
    type: "Full-time",
    start: "2024-05",
    end: "2024-12",
    location: "Remote",
    summary:
      "Built AI-powered document intelligence: semantic search and question answering over large sets of RFPs.",
    highlights: [
      "Built a question-answering system over RFP documents using semantic search, so users could query large document sets with high relevance.",
      "Implemented ingestion, chunking, embedding and retrieval pipelines with LangChain, OpenAI APIs and Pinecone, laying the groundwork for RAG.",
      "Compared vector search strategies, similarity metrics and chunking approaches to improve retrieval quality and reduce hallucinations.",
    ],
    more: [
      "Designed and tested AI proofs of concept to evaluate emerging LLM APIs, frameworks and tooling for marketing and content problems.",
      "Experimented extensively with prompt engineering and response structuring to map LLM strengths and failure modes.",
      "Contributed to Node.js, Express and MongoDB backend services for internal tools and experimental AI features.",
    ],
    skills: ["LangChain", "OpenAI", "Pinecone", "Node.js", "MongoDB", "TypeScript"],
  },
  {
    title: "Full-Stack Developer Intern",
    company: "Gutenberg",
    type: "Internship",
    start: "2023-02",
    end: "2024-04",
    location: "Remote",
    summary:
      "Built backend APIs and real-time, role-based dashboards for the finance team, and early OpenAI prototypes.",
    highlights: [
      "Designed scalable REST APIs with Node.js, Express and MongoDB behind a responsive React frontend with real-time updates.",
      "Built role-based dashboards with real-time insights that helped the finance team make faster, more accurate decisions.",
      "Added secure authentication, audit logs and data validation for compliance and traceability.",
    ],
    more: [
      "Explored OpenAI APIs from their initial public release, building proofs of concept for AI-driven automation inside internal tools.",
    ],
    skills: ["React", "Node.js", "Express", "MongoDB", "Redis", "OpenAI"],
  },
  {
    title: "Web Developer Intern",
    company: "Vocally",
    type: "Internship",
    start: "2022-10",
    end: "2023-01",
    location: "Vancouver, Canada · Remote",
    summary: "Shipped full-stack features across a React frontend and a Node.js backend.",
    highlights: [
      "Developed the React front-end architecture behind new user-interface concepts.",
      "Integrated frontend components with Node.js, Express, MongoDB and Mongoose backends.",
      "Built an internal admin panel with Retool and MongoDB.",
    ],
    skills: ["React", "Node.js", "Express", "MongoDB", "Retool"],
  },
  {
    title: "Technical Content Engineer Intern",
    company: "Kalvium",
    companyUrl: "https://kalvium.com",
    type: "Internship",
    start: "2022-06",
    end: "2022-08",
    location: "Coimbatore, India · Remote",
    summary: "Designed hands-on web development labs and industry-driven projects for outcome-based learning.",
    highlights: [
      "Created labs and practice exercises in HTML, CSS, JavaScript and React.",
      "Built projects from industry inputs to support outcome-driven learning.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}
