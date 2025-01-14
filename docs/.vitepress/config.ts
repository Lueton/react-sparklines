import react from "@vitejs/plugin-react";
import { defineConfig } from "vitepress";

import { version } from "../../package.json";

export default defineConfig({
  vite: {
    plugins: [react()],
  },
  base: "/react-sparklines/",
  lang: "en-US",
  title: "React Sparklines",
  titleTemplate: "React Sparklines",
  description: "Awesome Sparklines for React",
  cleanUrls: true,
  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/getting-started/quick-start" },
      {
        text: "Sparklines",
        items: [
          { text: "SparklinesLine", link: "/sparklines/sparklines-line" },
          { text: "SparklinesBar", link: "/sparklines/sparklines-bar" },
          { text: "SparklinesComposed", link: "/sparklines/sparklines-composed" },
        ],
      },
      { text: "API", link: "/api/sparklines/sparklines-line" },
      {
        text: `v${version}`,
        items: [
          { text: "Release Notes", link: "https://github.com/Lueton/react-sparklines/releases" },
          { text: "Roadmap", link: "/roadmap" },
        ],
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Installation", link: "/getting-started/installation" },
          { text: "Quick Start", link: "/getting-started/quick-start" },
        ],
      },
      {
        text: "Sparklines",
        items: [
          { text: "SparklinesLine", link: "/sparklines/sparklines-line/" },
          { text: "SparklinesBar", link: "/sparklines/sparklines-bar/" },
          { text: "SparklinesComposed", link: "/sparklines/sparklines-composed/" },
        ],
      },
      {
        text: "Sparkline Components",
        items: [
          { text: "Line", link: "/sparkline-components/line" },
          { text: "Bar", link: "/sparkline-components/bar" },
          { text: "ReferenceLine", link: "/sparkline-components/reference-line" },
        ],
      },
      {
        text: "General Components",
        items: [{ text: "Tooltip", link: "/general-components/tooltip" }],
      },
      {
        text: "Recipes",
        items:[{text: "Floating UI", link: "/recipes/floating-ui"}]
      },
      {
        text: "API",
        items: [
          {
            text: "Sparklines",
            items: [
              { text: "SparklinesLine", link: "/api/sparklines/sparklines-line" },
              { text: "SparklinesBar", link: "/api/sparklines/sparklines-bar" },
              { text: "SparklinesComposed", link: "/api/sparklines/sparklines-composed" },
            ],
          },
          {
            text: "Sparkline Components",
            items: [
              { text: "Line", link: "/api/sparkline-components/line" },
              {
                text: "Bar",
                link: "/api/sparkline-components/bar",
              },
              { text: "ReferenceLine", link: "/api/sparkline-components/reference-line" },
            ],
          },
          {
            text: "General Components",
            items: [{ text: "Tooltip", link: "/api/general-components/tooltip" }],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Lueton/react-sparklines" },
      { icon: "npm", link: "https://www.npmjs.com/package/@lueton/react-sparklines" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-PRESENT Leon Lüttger",
    },
  },
});
