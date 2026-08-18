export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled';
export type PaymentMethod = 'cash' | 'transfer' | 'mobile_pay' | 'debt';
export type SaleType = 'POS' | 'Catalog';
export type ExpenseCategory = 'Rent' | 'Payroll' | 'Suppliers' | 'Utilities' | 'Marketing' | 'Other';
export type AIInsightType = 'financial_tip' | 'marketing_copy' | 'daily_advice';

export interface Profile {
  id: string; // references auth.users
  business_name: string;
  slug: string; // unique for catalog URL e.g. mercadeo.app/slug
  category_niche: string;
  logo_url: string | null;
  banner_url: string | null;
  phone_whatsapp: string;
  social_links: Record<string, string> | null;
  subscription_status: SubscriptionStatus;
  trial_ends_at: string; // ISO Timestamp
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  business_id: string; // references profiles.id
  name: string;
  description: string | null;
  category: string;
  cost_price: number;
  selling_price: number;
  stock_quantity: number;
  min_stock_alert: number;
  images: string[];
  is_active: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string; // references products.id
  variant_name: string; // e.g. "Size", "Color"
  variant_value: string; // e.g. "XL", "Red"
  additional_price: number;
  stock_quantity: number;
}

export interface Sale {
  id: string;
  business_id: string; // references profiles.id
  total_amount: number;
  payment_method: PaymentMethod;
  sale_type: SaleType;
  customer_id: string | null; // references customers.id
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string; // references sales.id
  product_id: string; // references products.id
  quantity: number;
  unit_price: number;
}

export interface Expense {
  id: string;
  business_id: string; // references profiles.id
  title: string;
  category: ExpenseCategory | string;
  amount: number;
  created_at: string;
}

export interface Customer {
  id: string;
  business_id: string; // references profiles.id
  name: string;
  phone: string;
  debt_balance: number;
}

export interface AIInsight {
  id: string;
  business_id: string; // references profiles.id
  type: AIInsightType;
  content: string;
  created_at: string;
}

// Database schema definition for Supabase client typing
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'>;
        Update: Partial<Omit<Product, 'id' | 'business_id' | 'created_at'>>;
      };
      product_variants: {
        Row: ProductVariant;
        Insert: Omit<ProductVariant, 'id'>;
        Update: Partial<Omit<ProductVariant, 'id' | 'product_id'>>;
      };
      sales: {
        Row: Sale;
        Insert: Omit<Sale, 'id' | 'created_at'>;
        Update: Partial<Omit<Sale, 'id' | 'business_id' | 'created_at'>>;
      };
      sale_items: {
        Row: SaleItem;
        Insert: Omit<SaleItem, 'id'>;
        Update: Partial<Omit<SaleItem, 'id' | 'sale_id'>>;
      };
      expenses: {
        Row: Expense;
        Insert: Omit<Expense, 'id' | 'created_at'>;
        Update: Partial<Omit<Expense, 'id' | 'business_id' | 'created_at'>>;
      };
      customers: {
        Row: Customer;
        Insert: Omit<Customer, 'id'>;
        Update: Partial<Omit<Customer, 'id' | 'business_id'>>;
      };
      ai_insights: {
        Row: AIInsight;
        Insert: Omit<AIInsight, 'id' | 'created_at'>;
        Update: Partial<Omit<AIInsight, 'id' | 'business_id' | 'created_at'>>;
      };
    };
  };
}