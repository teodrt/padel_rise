module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#FFD60A", dark: "#FFC300" },
        accent: { DEFAULT: "#1D4ED8", light: "#3B82F6" },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.06)",
        lift: "0 6px 24px rgba(0,0,0,.12)",
      },
      borderRadius: { xl: "14px", "2xl": "20px" },
    },
  },
  plugins: [],
};
