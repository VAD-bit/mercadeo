export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled';
export type PaymentMethod = 'cash' | 'transfer' | 'mobile_pay' | 'binance_pay' | 'debt';
export type SaleType = 'POS' | 'Catalog';
export type SubPaymentMethod = 'mobile_pay' | 'binance_pay';
export type SubPaymentStatus = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  business_name: string;
  slug: string;
  category_niche: string;
  logo_url?: string | null;
  banner_url?: string | null;
  phone_whatsapp?: string | null;
  social_links?: Record<string, string> | null;
  subscription_status: SubscriptionStatus;
  trial_ends_at: string;
  pago_movil_id?: string | null;
  pago_movil_phone?: string | null;
  pago_movil_bank?: string | null;
  binance_pay_id?: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  business_id: string;
  name: string;
  description?: string | null;
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
  product_id: string;
  variant_name: string;
  variant_value: string;
  additional_price: number;
  stock_quantity: number;
}

export interface Sale {
  id: string;
  business_id: string;
  total_amount: number;
  payment_method: PaymentMethod;
  sale_type: SaleType;
  reference_number?: string | null;
  customer_id?: string | null;
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface Expense {
  id: string;
  business_id: string;
  title: string;
  category: string;
  amount: number;
  created_at: string;
}

export interface Customer {
  id: string;
  business_id: string;
  name: string;
  phone?: string | null;
  debt_balance: number;
}

export interface SubscriptionPayment {
  id: string;
  business_id: string;
  payment_method: SubPaymentMethod;
  amount_usd: number;
  reference_code: string;
  status: SubPaymentStatus;
  created_at: string;
}

export interface AIInsight {
  id: string;
  business_id: string;
  type: string;
  content: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'> & { created_at?: string };
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
        Relationships: [];
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Product, 'id' | 'business_id' | 'created_at'>>;
        Relationships: [];
      };
      product_variants: {
        Row: ProductVariant;
        Insert: Omit<ProductVariant, 'id'> & { id?: string };
        Update: Partial<Omit<ProductVariant, 'id' | 'product_id'>>;
        Relationships: [];
      };
      sales: {
        Row: Sale;
        Insert: Omit<Sale, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Sale, 'id' | 'business_id' | 'created_at'>>;
        Relationships: [];
      };
      sale_items: {
        Row: SaleItem;
        Insert: Omit<SaleItem, 'id'> & { id?: string };
        Update: Partial<Omit<SaleItem, 'id' | 'sale_id'>>;
        Relationships: [];
      };
      expenses: {
        Row: Expense;
        Insert: Omit<Expense, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Expense, 'id' | 'business_id' | 'created_at'>>;
        Relationships: [];
      };
      customers: {
        Row: Customer;
        Insert: Omit<Customer, 'id'> & { id?: string };
        Update: Partial<Omit<Customer, 'id' | 'business_id'>>;
        Relationships: [];
      };
      subscription_payments: {
        Row: SubscriptionPayment;
        Insert: Omit<SubscriptionPayment, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<SubscriptionPayment, 'id' | 'business_id' | 'created_at'>>;
        Relationships: [];
      };
      ai_insights: {
        Row: AIInsight;
        Insert: Omit<AIInsight, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<AIInsight, 'id' | 'business_id' | 'created_at'>>;
        Relationships: [];
      };
    };
  };
}