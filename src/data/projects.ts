export type Project = {
  name: string;
  year: number;
  tagline: string;
  description: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "Widgetsy",
    year: 2022,
    tagline: "A widget library for React projects",
    description:
      "A platform of customizable widgets for React apps, with a visual editor that generates the code and an npm package to drop them in.",
    points: [
      "Widget editor with live customization and code generation",
      "Published as an npm library for one-line installs",
      "Guided editor walkthrough with React Joyride, docs on Docusaurus",
    ],
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Docusaurus"],
    links: [],
  },
  {
    name: "Doodlesy!",
    year: 2022,
    tagline: "A free multiplayer drawing game",
    description:
      "A real-time multiplayer drawing game with three modes: Guess It, Rate It and Grand Reveal.",
    points: [
      "Real-time chat and drawing sync over Socket.io",
      "Game state and storage on Firebase",
      "Snappy, playful React UI",
    ],
    stack: ["React", "Socket.io", "Firebase"],
    links: [{ label: "Code", href: "https://github.com/webtopia035/doodlesy" }],
  },
];
