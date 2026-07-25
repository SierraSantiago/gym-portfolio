import type { ProjectStationData } from '../types/project'

export const projectStations: ProjectStationData[] = [
  {
    id: 'social-lockers',
    title: 'Meet Santiago',
    kind: 'social',
    position: [-7.95, 0.92, 4.85],
    interactionRadius: 1.7,
    status: 'Social Hub',
    summary: 'A dedicated stop to understand who Santiago Sierra is beyond the project cards.',
    description:
      "I'm Santiago Sierra, a Data, AI & Software Engineer who enjoys building practical digital experiences that connect software, automation, and intelligent systems. This gym portfolio reflects the way I like to work: turning technical ideas into something clear, interactive, and memorable. If you want to understand how I think, build, and evolve projects, my GitHub and LinkedIn are the best places to continue the conversation.",
    features: [
      'Explore the repositories, experiments, and code structure I share on GitHub.',
      'See my professional profile, experience, and direction on LinkedIn.',
      'Use this station as the best next step if you want to connect, collaborate, or follow my work.',
    ],
    stack: ['Data', 'AI', 'Software Engineering', 'GitHub', 'LinkedIn'],
    links: [
      {
        label: 'GitHub / SierraSantiago',
        url: 'https://github.com/SierraSantiago',
      },
      {
        label: 'LinkedIn / Santiago Sierra',
        url: 'https://www.linkedin.com/in/santiago-sierra-ramirez-a21389286',
      },
    ],
  },
  {
    id: 'career-pulse',
    title: 'CareerPulse',
    tourOrder: 1,
    position: [-6.55, 0.92, 2.45],
    interactionRadius: 1.9,
    status: 'Treadmill Station',
    summary: 'A featured project anchored to the treadmill area.',
    description:
      'Use this panel to explain what CareerPulse does, the problem it solves, the architecture behind it, and the impact it created. This section is ready for a fuller narrative, screenshots, or metrics when you add the final content.',
    features: [
      'Replace this with the most important feature of the project.',
      'Add the main workflow or user interaction here.',
      'Include one measurable outcome or business result here.',
    ],
    stack: ['Add stack', 'API', 'Frontend', 'Database'],
  },
  {
    id: 'bench-left-project',
    title: 'Bench Left Project',
    tourOrder: 2,
    position: [-4.7, 0.92, -3.2],
    interactionRadius: 1.8,
    status: 'Bench Zone',
    summary: 'Project point positioned to the left side of the bench area.',
    description:
      'Use this space for the full story of the left-bench project: context, scope, technical decisions, constraints, and what made it meaningful in your portfolio.',
    features: [
      'Add the top capability you want visitors to remember.',
      'Describe one technical challenge and how you solved it.',
      'Mention a concrete outcome, automation, or time saved.',
    ],
    stack: ['Add stack', 'Backend', 'Cloud', 'Automation'],
  },
  {
    id: 'risk-analysis-ai',
    title: 'Risk Analysis AI',
    tourOrder: 3,
    position: [0.1, 0.92, -3.15],
    interactionRadius: 1.85,
    status: 'Center Bench Zone',
    summary: 'An AI project staged in the middle of the bench section.',
    description:
      'Use this panel to describe the AI use case, data inputs, model decisions, and how the solution supported analysis or decision-making. This layout is intentionally large so you can expand it with richer project detail later.',
    features: [
      'Summarize the core AI or analytics capability here.',
      'Explain the flow from raw data to useful output.',
      'Add the metric, insight, or efficiency gain delivered.',
    ],
    stack: ['Add stack', 'Python', 'AI/ML', 'Visualization'],
  },
  {
    id: 'automation-pipeline',
    title: 'Automation Pipeline',
    tourOrder: 4,
    position: [4.8, 0.92, -3.2],
    interactionRadius: 1.8,
    status: 'Right Bench Zone',
    summary: 'A pipeline-focused project positioned on the right side of the bench row.',
    description:
      'Use this section to present the pipeline end to end: trigger, orchestration, processing, outputs, and deployment details. You can later replace this placeholder with the final project story and supporting links.',
    features: [
      'Describe the trigger or entry point of the automation.',
      'Add the processing stages or orchestration steps here.',
      'Highlight the reliability, speed, or scale improvement achieved.',
    ],
    stack: ['Add stack', 'Pipelines', 'Integrations', 'Monitoring'],
  },
  {
    id: 'right-machines-project',
    title: 'Right Machines Project',
    tourOrder: 5,
    position: [7.05, 0.92, -0.45],
    interactionRadius: 1.85,
    status: 'Machines Zone',
    summary: 'A featured project anchored to the machines on the right side.',
    description:
      'Use this panel for a project you want visitors to discover after moving deeper into the gym. It is a good place for a systems, operations, or full-stack case study with links to GitHub and a live demo later.',
    features: [
      'Add the main user or business problem solved here.',
      'Call out the system design, integration, or workflow logic.',
      'Mention one result that shows why the project matters.',
    ],
    stack: ['Add stack', 'Systems', 'APIs', 'Deployment'],
  },
] as const
