'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface SettingsData {
  store_name?: string;
  logo_url?: string | null;
  primary_color?: string;
}

interface AppContextType {
  storeName: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  sales: any[];
  employees: any[];
  setStoreName: (name: string) => void;
  setLogoUrl: (url: string | null) => void;
  setPrimaryColor: (color: string) => void;
  setSales: React.Dispatch<React.SetStateAction<any[]>>;
  setEmployees: React.Dispatch<React.SetStateAction<any[]>>;
  refreshBranding: () => Promise<void>;
}

const AppContext = createContext<AppContextType>({
  storeName: 'Reality Shop',
  logoUrl: null,
  primaryColor: '#6366f1',
  secondaryColor: '#00D2FF',
  sales: [],
  employees: [],
  setStoreName: () => {},
  setLogoUrl: () => {},
  setPrimaryColor: () => {},
  setSales: () => {},
  setEmployees: () => {},
  refreshBranding: async () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [storeName, setStoreName] = useState('Reality Shop');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [secondaryColor] = useState('#00D2FF');
  
  // Añadimos los estados globales de sales y employees para que cualquier módulo (como accounting) los lea sin chistar
  const [sales, setSales] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  const supabase = createClient();

  const fetchBranding = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('settings')
        .select('store_name, logo_url, primary_color')
        .eq('user_id', user.id)
        .single();

      const settings = data as SettingsData | null;

      if (settings) {
        if (settings.store_name) setStoreName(settings.store_name);
        if (settings.logo_url !== undefined) setLogoUrl(settings.logo_url);
        if (settings.primary_color) setPrimaryColor(settings.primary_color);
      }
    } catch (e) {
      console.error('Error cargando branding:', e);
    }
  };

  useEffect(() => {
    fetchBranding();
  }, []);

  return (
    <AppContext.Provider
      value={{
        storeName,
        logoUrl,
        primaryColor,
        secondaryColor,
        sales,
        employees,
        setStoreName,
        setLogoUrl,
        setPrimaryColor,
        setSales,
        setEmployees,
        refreshBranding: fetchBranding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);