import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  CalendarDays,
  ChartColumn,
  Settings,
  UserCheck,
  Clock3,
} from "lucide-react";

export const menu = [
  {
    title: "Kanbar-Board",
    icon: LayoutDashboard,
  },
  {
    title: "Backlog",
    icon: ClipboardList,
  },
  {
    title: "Projects",
    icon: FolderKanban,
  },
  {
    title: "Calendar",
    icon: CalendarDays,
  },
  {
    title: "Analytics",
    icon: ChartColumn,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export const quickLinks = [
  {
    title: "Assigned",
    count: 2,
    icon: UserCheck,
  },
  {
    title: "Due Today",
    count: 1,
    icon: Clock3,
  },
];