// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: [
  "./**/*.{js,ts,jsx,tsx}",
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
  './packages/ui/**/*.{js,ts,jsx,tsx}', //from 
  "../../packages/**/*.{js,ts,jsx,tsx}",//to
  './ui/**/*.{ts,tsx}'
],
  presets: [sharedConfig],
};

export default config;
