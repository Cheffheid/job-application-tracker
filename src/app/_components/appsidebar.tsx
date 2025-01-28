"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
import React from "react";

interface AppSidebarProps
  extends React.ComponentPropsWithoutRef<typeof Sidebar> {
  accesslevel?: string;
}

const baseLinkClasses =
  "false group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-textSidebar duration-100 ease-in-out hover:bg-hoverSidebar focus:bg-hoverSidebar";
const activeLinkClasses = baseLinkClasses + " bg-hoverSidebar";

function determineAccess(accesslevel = "") {
  return "write" === accesslevel || "admin" === accesslevel;
}

function AdminMenuItems({ currentpath = "" }: { currentpath: string }) {
  return (
    <>
      <SidebarMenuItem>
        <Link
          href="/application/update"
          className={
            currentpath === "/application/update"
              ? activeLinkClasses
              : baseLinkClasses
          }
        >
          Manage
        </Link>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <Link
          href="/application/add"
          className={
            currentpath === "/application/add"
              ? activeLinkClasses
              : baseLinkClasses
          }
        >
          Add New
        </Link>
      </SidebarMenuItem>
    </>
  );
}

const AppSidebar = React.forwardRef<
  React.ComponentRef<typeof Sidebar>,
  AppSidebarProps
>(({ accesslevel, ...props }, ref) => {
  const currentPath = usePathname();
  const adminmenu = determineAccess(accesslevel);

  return (
    <Sidebar {...props} ref={ref}>
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
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link
                  href="/"
                  className={
                    currentPath === "/" ? activeLinkClasses : baseLinkClasses
                  }
                >
                  List
                </Link>
              </SidebarMenuItem>
              {adminmenu && (
                <AdminMenuItems currentpath={currentPath}></AdminMenuItems>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
});

AppSidebar.displayName = "App Sidebar";

export default AppSidebar;
