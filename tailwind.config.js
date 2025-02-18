/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: "#3abfef",
        secondary: "#FFAA00",
      },
      boxShadow: {
        custom: "5px 5px 20px 0px rgba(0, 0, 0, 0.11)",
        custom2: "5px 5px 10px 0px rgba(0, 0, 0, 0.11)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
