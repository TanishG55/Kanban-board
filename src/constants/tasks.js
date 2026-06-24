import { Profile } from "../UI/Icons";

export const initialTasks = [
  {
    id: "TH-2500",
    title: "Design Homepage",
    description: "Create homepage layout and responsive sections.",

    status: "Todo",

    feature: {
      id: "F1",
      name: "Homepage Design",
      color: "#2563eb",
    },

    priority: "High",

    assignee: {
      id: "U1",
      name: "Tanish",
      avatar: Profile,
    },

    reporter: "Admin",

    labels: ["UI", "Frontend"],

    storyPoints: 8,

    environment: "Development",

    dueDate: "2026-06-20",

    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",

    commentsCount: 2,
    attachmentsCount: 0,

    subtasks: [],
  },

  {
    id: "TH-2501",
    title: "Design Kanban Board",
    description: "Build Kanban board UI and drag-drop layout.",

    status: "Peer-Review",

    feature: {
      id: "F2",
      name: "Design Board",
      color: "#7c3aed",
    },

    priority: "High",

    assignee: {
      id: "U2",
      name: "Naresh",
      avatar: "",
    },

    reporter: "Admin",

    labels: ["UI", "Board"],

    storyPoints: 6,

    environment: "Development",

    dueDate: "2026-06-18",

    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",

    commentsCount: 2,
    attachmentsCount: 1,

    subtasks: [],
  },

  {
    id: "TH-2502",
    title: "Learn Theme Variables",
    description: "Study design tokens and theme variables.",

    status: "Peer-Review",

    feature: {
      id: "F2",
      name: "Design Board",
      color: "#7c3aed",
    },

    priority: "Medium",

    assignee: {
      id: "U3",
      name: "Ujjwal",
      avatar: "",
    },

    reporter: "Admin",

    labels: ["Research"],

    storyPoints: 1,

    environment: "Development",

    dueDate: "2026-06-22",

    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",

    commentsCount: 1,
    attachmentsCount: 0,

    subtasks: [],
  },

  {
    id: "TH-2503",
    title: "React DnD",
    description: "Implement drag and drop functionality.",

    status: "Validation",

    feature: {
      id: "F2",
      name: "Design Board",
      color: "#7c3aed",
    },

    priority: "Medium",

    assignee: {
      id: "U4",
      name: "Vaibhav",
      avatar: "",
    },

    reporter: "Admin",

    labels: ["React", "DnD"],

    storyPoints: 0.5,

    environment: "Development",

    dueDate: "2026-06-25",

    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",

    commentsCount: 3,
    attachmentsCount: 0,

    subtasks: [],
  },

  {
    id: "TH-2504",
    title: "React19 vs React16",
    description: "Compare React versions and migration impact.",

    status: "Validation",

    feature: {
      id: "F2",
      name: "Design Board",
      color: "#7c3aed",
    },

    priority: "Medium",

    assignee: {
      id: "U4",
      name: "Vaibhav",
      avatar: "",
    },

    reporter: "Admin",

    labels: ["Research"],

    storyPoints: 1,

    environment: "Development",

    dueDate: "2026-06-27",

    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",

    commentsCount: 2,
    attachmentsCount: 0,

    subtasks: [],
  },

  {
    id: "TH-2505",
    title: "Next.js Documentation",
    description: "Read Next.js routing and server components docs.",
    acceptanceCriteria: "",

    status: "In-Progress",

    feature: {
      id: "F1",
      name: "Homepage Design",
      color: "#2563eb",
    },

    priority: "Medium",

    assignee: {
      id: "U1",
      name: "Tanish",
      avatar: "",
    },

    reporter: "Admin",

    labels: ["NextJS"],

    storyPoints: 1,

    environment: "Development",

    dueDate: "2026-06-30",

    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",

    commentsCount: 2,
    attachmentsCount: 0,

    subtasks: [],
  },

  {
    id: "TH-2506",
    title: "Code Migration",
    description: "Migrate legacy codebase to new architecture.",

    status: "In-Progress",

    feature: {
      id: "F1",
      name: "Homepage Design",
      color: "#2563eb",
    },

    priority: "Low",

    assignee: {
      id: "U1",
      name: "Tanish",
      avatar: "",
    },

    reporter: "Admin",

    labels: ["Migration"],

    storyPoints: 2,

    environment: "Development",

    dueDate: "2026-07-05",

    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",

    commentsCount: 2,
    attachmentsCount: 0,

    subtasks: [],
  },
];

export const Priorities = ["High", "Medium", "Low"];

export const FEATURES = [
  {
    id: "F1",
    name: "Homepage Design",
    color: "#2563eb",
  },
  {
    id: "F2",
    name: "Design Board",
    color: "#7c3aed",
  },
];

export const USERS = [
  {
    id: "U1",
    name: "Tanish",
  },
  {
    id: "U2",
    name: "Naresh",
  },
  {
    id: "U3",
    name: "Ujjwal",
  },
  {
    id: "U4",
    name: "Vaibhav",
  },
  {
    id: "U5",
    name: "Harsh",
  },
];
