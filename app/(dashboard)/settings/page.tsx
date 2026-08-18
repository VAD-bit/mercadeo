import { DashboardShell } from "@/components/layout/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your business profile and catalog preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business profile</CardTitle>
            <CardDescription>
              This information appears on your public catalog.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Business name</Label>
              <Input id="name" placeholder="My Store" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Catalog URL slug</Label>
              <Input id="slug" placeholder="my-store" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact email</Label>
              <Input id="email" type="email" placeholder="hello@business.com" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
