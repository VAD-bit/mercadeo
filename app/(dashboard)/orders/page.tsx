import { ShoppingCart } from "lucide-react";

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
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Track and fulfill orders from your catalog and manual entries.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="size-5" />
              All orders
            </CardTitle>
            <CardDescription>
              Orders from manual entry, catalog, and imports appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">No orders yet</Badge>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
