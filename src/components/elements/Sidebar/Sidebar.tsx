"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { SessionContext } from "~/lib/session";
import { Separator } from "~/components/ui/separator";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = React.useContext(SessionContext);

  const username = session?.user.name;
  const userAvatar = session?.user.image;
  const userEmail = session?.user.email;
  const role = session?.user.role;

  const data = {
    user: {
      name: username,
      email: userEmail,
      avatar: userAvatar,
      role: role,
    },
    teams: [
      {
        name: "NeoPrism",
        logo: "TW",
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "Tasks",
        url: role === "admin" ? "/admin/tasks" : "/dashboard/tasks",
        icon: Bot,
        items: [
          {
            title: "All tasks",
            url: role === "admin" ? "/admin/tasks" : "/dashboard/tasks",
          },
          {
            title: "High priority",
            url:
              role === "admin"
                ? "/admin/tasks?priority=high"
                : "/dashboard/tasks?priority=high",
          },
          {
            title: "Normal priority",
            url:
              role === "admin"
                ? "/admin/tasks?priority=normal"
                : "/dashboard/tasks?priority=normal",
          },
          {
            title: "Low priority",
            url:
              role === "admin"
                ? "/admin/tasks?priority=low"
                : "/dashboard/tasks?priority=low",
          },
        ],
      },
      {
        title: "Recent",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Tasks",
            url: "#",
          },
          {
            title: "Projects",
            url: "#",
          },
          {
            title: "Files",
            url: "#",
          }
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  if (!session) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
