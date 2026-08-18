import { Globe, Store } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CatalogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CatalogPageProps) {
  const { slug } = await params;
  return {
    title: `${slug} — Catalog`,
  };
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Store className="size-5" />
          <div>
            <h1 className="font-semibold capitalize">{slug.replace(/-/g, " ")}</h1>
            <p className="text-xs text-muted-foreground">Public catalog</p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            <Globe className="mr-1 size-3" />
            Online
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Featured products</h2>
          <p className="text-muted-foreground">
            Browse products from this business storefront.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="aspect-square rounded-lg bg-muted" />
                <CardTitle>Sample product {i}</CardTitle>
                <CardDescription>
                  Product details will load from Supabase once connected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">${(19.99 * i).toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">Demo</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
