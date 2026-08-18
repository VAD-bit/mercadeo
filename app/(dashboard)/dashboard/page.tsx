import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Dashboard",
};

const stats = [
  {
    title: "Revenue",
    value: "$12,450",
    description: "+12% from last month",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "148",
    description: "23 pending fulfillment",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "892",
    description: "+48 new this month",
    icon: Users,
  },
  {
    title: "Products",
    value: "156",
    description: "5 low stock alerts",
    icon: Package,
  },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back. Here&apos;s what&apos;s happening with your business.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Your latest orders and inventory updates will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">Demo</Badge>
              Connect Supabase to see live data.
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
