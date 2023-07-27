import React from "react";
import PropTypes from "prop-types";
import { PageProps, graphql } from "gatsby";
import SectionTemplate from "~/templates/section-listing";

/**
 * Section listing page for work articles
 * @param {object} data [description]
 */
export default function Section({
  data: {
    allMarkdownRemark: { edges: items },
  },
}: PageProps<Queries.GetWordsArchivePosts>) {
  const itemsFiltered = items.filter((item) => item.node.frontmatter.archive);
  return (
    <SectionTemplate
      items={itemsFiltered}
      heading={"Words Archive"}
      footerCTA={{
        text: "Back to Words",
        link: "/words",
      }}
    />
  );
}

Section.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query GetWordsArchivePosts {
    allMarkdownRemark(
      filter: {
        frontmatter: { category: { eq: "words" }, archive: { eq: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      ...GetSectionPosts
    }
  }
`;
