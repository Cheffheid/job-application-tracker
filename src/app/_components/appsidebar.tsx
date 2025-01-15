import Link from "next/link";
import { auth } from "~/server/auth";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const linkClasses =
  "false group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-textSidebar duration-100 ease-in-out hover:bg-hoverSidebar focus:bg-hoverSidebar";

async function AdminMenu() {
  const session = await auth();

  if (!session || "demo" === session.user.accessLevel) {
    return;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Applications</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/application/add" className={linkClasses}>
              Add New
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/application/update" className={linkClasses}>
              Manage
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h1 className="text-center font-bold text-white">
          Job Application Tracker
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <VisuallyHidden.Root>
            <h2>Sidebar</h2>
          </VisuallyHidden.Root>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/" className={linkClasses}>
                  Applications
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <AdminMenu></AdminMenu>
      </SidebarContent>
    </Sidebar>
  );
}
