'use client';
import { SidebarNav } from "../components/dashboard/SidebarNav";
import { sidebarNavItems } from "../constants";

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout(
  { children }: DashboardLayoutProps
) {
  return (
    <div className="flex flex-row w-full">
      <aside >
        <SidebarNav items={sidebarNavItems} />
      </aside>
      {children}
    </div>
  )
}

