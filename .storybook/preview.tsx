import type { Preview } from "@storybook/react";
import "../src/storybook.css";
import "tailwindcss/tailwind.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import { ThemeProvider } from "../src/components/ThemeToggle";
import { Toaster } from "../src/components/ui/Toaster";
import React from "react";
import { themes } from "@storybook/theming";
import { darkUIStorybook, lightUIStorybook, commonTheme } from "./themes";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    darkMode: {
      classTarget: "html",
      stylePreview: true,
      darkClass: "dark",
      lightClass: "light",
      dark: { ...themes.dark, ...darkUIStorybook, ...commonTheme },
      light: { ...themes.normal, ...lightUIStorybook, ...commonTheme },
      current: "light",
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story: React.FC) => (
    <ThemeProvider>
      <div className="max-h-screen">
        <Toaster />
        <Story />
      </div>
    </ThemeProvider>
  ),
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];

export default preview;
