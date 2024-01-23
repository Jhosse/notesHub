/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        sm: "0px 10px 10px -10px rgba(0, 0, 0, 0.3)",
      },
    },
    colors: {
      yellow: {
        400: "#FACC15",
        DEFAULT: "#FDE047", // #fbf36d
      },
      blue: {
        700: "#1D4ED8",
        500: "#3B82F6",
        DEFAULT: "#1E3A8A",
      },
      black: {
        DEFAULT: "#000",
      },
      gray: {
        200: "#e5e7eb",
        400: "#9ca3af",
        DEFAULT: "#111827",
      },
      white: {
        DEFAULT: "#fff",
      },
      transparent: {
        DEFAULT: "#ffffff00",
      },
    },

    fontFamily: {
      mona: ["Mona_Sans", "sans-serif"],
    },
  },
  plugins: [],
};
