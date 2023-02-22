import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: "https://jonhiggins.co.uk",
    title: `Jon Higgins - VR/XR student and software engineer in Bristol, UK`,
    titleHTML:
      "Jon Higgins <span>VR/XR student and software engineer in Bristol,&nbsp;UK</span>",
    description: `Portfolio website with articles on VR, XR and software engineering`,
    author: `Jon Higgins`,
    navigationLinks: [
      {
        name: "Work",
        link: "/work",
      },
      {
        name: "Words",
        link: "/words",
      },
      {
        name: "Who",
        link: "/who",
      },
    ],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-layout",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};

export default config;
