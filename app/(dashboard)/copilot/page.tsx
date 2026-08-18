import { Bot, Send } from "lucide-react";

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
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "AI Copilot",
};

export default function CopilotPage() {
  return (
    <DashboardShell>
      <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Bot className="size-6" />
            AI Copilot
          </h1>
          <p className="text-muted-foreground">
            Ask questions about your business, get insights, and automate tasks.
          </p>
        </div>

        <Card className="flex flex-1 flex-col">
          <CardHeader>
            <CardTitle>Business assistant</CardTitle>
            <CardDescription>
              The copilot has access to your inventory, orders, and customer data.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-4">
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed bg-muted/30 p-8 text-center">
              <div>
                <Badge variant="secondary" className="mb-3">
                  Coming soon
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Connect an AI provider and Supabase to enable conversational
                  business intelligence.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Ask about sales, inventory, or customers..." />
              <Button size="icon">
                <Send className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
