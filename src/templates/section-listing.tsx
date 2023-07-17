import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import CTA from "~/components/cta";
import HeadingBackground from "~/components/heading-background";
import LinkBlock from "~/components/link-block";
import PageWrapper from "~/components/page-wrapper";
import SEO from "~/components/seo";

import { BASELINE } from "~/settings/typography";
import { rem } from "~/utils";
import { BREAKPOINTS } from "~/settings/breakpoints";
import { GRID_GUTTER_REM } from "~/settings/grid";

interface Props {
  heading?: string;
  items: Queries.GetSectionPostsFragment["edges"];
  footerCTA?: {
    link: string;
    text: string;
  };
}

const SectionListingWrapper = styled("div")`
  grid-gap: ${GRID_GUTTER_REM.S};
  margin-bottom: ${GRID_GUTTER_REM.M};
  ${BREAKPOINTS.M_MIN} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: ${GRID_GUTTER_REM.M};
  }
`;

const LinkBlocks = styled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;
  grid-column: span 4;
  display: grid;
  grid-template-columns: inherit;
  grid-gap: inherit;
`;

const Footer = styled("footer")`
  margin-top: ${rem(BASELINE * 2)};
`;

const LinkBlockStyled = styled(LinkBlock)`
  margin-bottom: 0;
`;

export default function SectionListing({ heading, items, footerCTA }: Props) {
  return (
    <PageWrapper>
      <SEO title={heading} />
      <HeadingBackground>{heading}</HeadingBackground>
      <SectionListingWrapper>
        <LinkBlocks>
          {items.map(({ node }, index) => {
            const { frontmatter, fields } = node;
            return (
              <LinkBlockStyled
                key={index}
                link={fields.slug}
                visible={true}
                frontmatter={frontmatter}
                gridWidth={2}
              />
            );
          })}
        </LinkBlocks>
        {footerCTA && (
          <Footer>
            <CTA to={footerCTA.link}>{footerCTA.text}</CTA>
          </Footer>
        )}
      </SectionListingWrapper>
    </PageWrapper>
  );
}

SectionListing.propTypes = {
  data: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  heading: PropTypes.string,
  footerCTA: PropTypes.shape({
    text: PropTypes.string,
    link: PropTypes.string,
  }),
  fields: PropTypes.shape({
    slug: PropTypes.string,
  }),
};

/**
 * GraphQL fragment that specifies the content
 * we need for this template.
 * It gets included in a page's GraphQL query via "...GetSectionPosts"
 * https://www.gatsbyjs.org/docs/querying-with-graphql/#fragments
 * @type {Query}
 */
export const pageQuery = graphql`
  fragment GetSectionPosts on MarkdownRemarkConnection {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
          description
          archive
        }
      }
    }
  }
`;
