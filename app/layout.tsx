import './globals.css';
import { AppProvider } from '@/app/context/AppContext';

export const metadata = {
  title: 'Reality Shop - Test Demo',
  description: 'Plataforma Operativa de Gestión',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-zinc-950 text-white font-sans antialiased selection:bg-indigo-500/30">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}