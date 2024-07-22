"use client";

import { useContext } from "react";
import { SidebarContext } from "@/providers/sidebar-provider";

export const useSidebar = () => {
  return useContext(SidebarContext);
};
