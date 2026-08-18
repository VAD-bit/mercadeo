import { Package } from "lucide-react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Inventory",
};

export default function InventoryPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground">
              Manage products, stock levels, and categories.
            </p>
          </div>
          <Button>Add product</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="size-5" />
              Products
            </CardTitle>
            <CardDescription>
              Your product catalog will sync with the public storefront.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">Empty</Badge>
            <p className="mt-2 text-sm text-muted-foreground">
              Add your first product to start selling.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
