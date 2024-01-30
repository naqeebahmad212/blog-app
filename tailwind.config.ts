import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0087ff",

          secondary: "#706800",

          accent: "#00d644",

          neutral: "#241b13",

          "base-100": "#FFFFFF",

          info: "#0079f1",

          success: "#00ffb8",

          warning: "#e85800",

          error: "#ff8d8d",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
