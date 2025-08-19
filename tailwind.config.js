/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: {
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        pink: {
          500: "#ec4899",
        },
        purple: {
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        blue: {
          500: "#3b82f6",
          600: "#2563eb",
        },
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xl': '24px',
      },
      blur: {
        'xl': '24px',
      },
    },
  },
  plugins: [],
};
