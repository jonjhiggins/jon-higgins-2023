import { CreateWebpackConfigArgs } from "gatsby";

const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
  });
};

/**
 * onCreateNode function will be called by Gatsby whenever a new node
 * is created (or updated).
 */
exports.onCreateNode = ({
  node,
  getNode,
  actions,
}: CreateWebpackConfigArgs) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
