import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "table-header": ["20px", { lineHeight: "1.5", fontWeight: "700" }],
        "table-body": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "button-s": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "button-m": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "button-l": ["20px", { lineHeight: "1.5", fontWeight: "400" }],
        "modal-title": ["24px", { lineHeight: "1.5", fontWeight: "700" }],
        label: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        h2: ["24px", { lineHeight: "1.5", fontWeight: "700" }],
        p: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
export default config;
