/** @type {import('tailwindcss').Config} */
export default {
  darkMode : "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      heading: ["Poppins", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
      colors: {
        primary: {
          DEFAULT: "#4F46E5", //  indigo color 
          hover: "#6366F1",
        },
        accent: {
          DEFAULT: "#2563EB", // blue color 
          hover: "#3B82F6",
        },
        success: {
          DEFAULT: "#059669", // emerald color
          light: "#10B981",
        },
        error: {
          DEFAULT: "#DC2626", // rose color 
          light: "#EF4444",
        },
        neutral: {
          darkest: "#0F172A", // slate 900
          dark: "#334155",    // slate 700
          light: "#F1F5F9",   // slate 100
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
