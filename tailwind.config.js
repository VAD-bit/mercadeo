/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#86EFAC',      // Verde lima brillante del logo
          emerald: '#10B981',   // Verde esmeralda central
          teal: '#14B8A6',      // Turquesa de transición
          sky: '#0284C7',       // Azul cerúleo superior
          blue: '#2563EB',      // Azul profundo
        },
        surface: {
          dark: '#0B0F17',      // Fondo base ultra oscuro estilo SaaS
          card: 'rgba(15, 23, 42, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #86EFAC 0%, #10B981 35%, #0284C7 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #A7F3D0 0%, #34D399 35%, #38BDF8 100%)',
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(2, 132, 199, 0.3)',
        'glow-brand': '0 0 35px -5px rgba(16, 185, 129, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}