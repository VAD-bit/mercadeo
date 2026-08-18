import Link from "next/link";
import {
  Bot,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

export const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    description: "Overview and key metrics",
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: "Package",
    description: "Products and stock",
  },
  {
    title: "Orders",
    href: "/orders",
    icon: "ShoppingCart",
    description: "Sales and fulfillment",
  },
  {
    title: "Customers",
    href: "/customers",
    icon: "Users",
    description: "Customer relationships",
  },
  {
    title: "Copilot",
    href: "/copilot",
    icon: "Bot",
    description: "AI business assistant",
  },
];

const iconMap = {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Bot,
  Store,
};

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {mainNavItems.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Store;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Icon className="size-4 shrink-0" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
