import type { Tables } from "./database";

export type Business = Tables<"businesses">;
export type Product = Tables<"products">;
export type Category = Tables<"categories">;
export type Customer = Tables<"customers">;
export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;
export type CopilotConversation = Tables<"copilot_conversations">;
export type CopilotMessage = Tables<"copilot_messages">;

export type BusinessRole = "owner" | "admin" | "staff";
export type OrderStatus = "pending" | "confirmed" | "fulfilled" | "cancelled";
export type OrderSource = "manual" | "catalog" | "import";

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockProducts: number;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  description?: string;
}
