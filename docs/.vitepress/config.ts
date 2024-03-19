import { defineConfig } from "vitepress"
import { version } from "../../package.json"
import react from "@vitejs/plugin-react"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [react()],
  },
  lang: "en-US",
  title: "React Sparklines",
  titleTemplate: "React Sparklines",
  description: "Awesome Sparklines for React",
  cleanUrls: true,
  themeConfig: {
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
      { text: "API", link: "/markdown-examples" },
      {
        text: `v${version}`,
        items: [
          { text: "Release Notes", link: "https://github.com/Luetonize/react-sparklines/releases" },
          { text: "Roadmap", link: "/roadmap"}
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
          { text: "Line", link: "/api-examples" },
          { text: "Bar", link: "/api-examples" },
        ],
      },
      {
        text: "General Components",
        items: [{ text: "Tooltip", link: "/api-examples" }],
      },
      {
        text: "Recipes",
        items: [
          {
            text: "SparklinesLine",
            items: [],
          },
          {
            text: "SparklinesBar",
            items: [],
          },
          {
            text: "SparklinesComposed",
            items: [],
          },
        ],
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
            ],
          },
          {
            text: "General Components",
            items: [{ text: "Tooltip", link: "/api-examples" }],
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/Luetonize/react-sparklines" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-PRESENT Leon Lüttger",
    },
  },
})
