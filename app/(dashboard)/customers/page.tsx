import { Users } from "lucide-react";

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
  title: "Customers",
};

export default function CustomersPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage customer profiles, contact info, and purchase history.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              Customer list
            </CardTitle>
            <CardDescription>
              Customers are created automatically from orders or added manually.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">No customers yet</Badge>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
