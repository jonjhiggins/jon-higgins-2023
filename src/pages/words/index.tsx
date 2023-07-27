import React from "react";
import PropTypes from "prop-types";
import { PageProps, graphql } from "gatsby";
import SectionTemplate from "~/templates/section-listing";

/**
 * Section listing page for words articles
 * @param {object} data [description]
 */
export default function Section({
  data: {
    allMarkdownRemark: { edges: items },
  },
}: PageProps<Queries.GetWordsPostsQuery>) {
  return (
    <SectionTemplate
      items={items}
      heading={"Words"}
      footerCTA={{
        text: "Archive",
        link: "/words/archive",
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
  query GetWordsPosts {
    allMarkdownRemark(
      filter: {
        frontmatter: { category: { eq: "words" }, archive: { ne: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      ...GetSectionPosts
    }
  }
`;
