"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/app/components/ui/button"
import { LucideIcon } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: LucideIcon
  }[]
}

export function SidebarNav({ items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className=
      "flex flex-col bg-white w-12 md:w-40 border-r shadow rounded-sm h-full"
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          <item.icon className="md:mr-2 h-4 w-4" />
          <p className="hidden md:block">{item.title}</p>
        </Link>
      ))}
    </nav>
  )
}