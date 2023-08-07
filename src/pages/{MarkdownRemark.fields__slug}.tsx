import React from "react";
import PropTypes from "prop-types";
import { PageProps, graphql } from "gatsby";
import PageWrapper from "~/components/page-wrapper";
import ArticleWrapper from "~/components/article-wrapper";
import Article from "~/components/article";
import ArticleContent from "~/components/article-content";
import ArticleHeaderMedia from "~/components/article-header-media";
import BodyText from "~/components/body-text";
import CTA from "~/components/cta";
import HeadingBackground from "~/components/heading-background";
import Heading from "~/components/heading";
import SEO from "~/components/seo";
import styled from "@emotion/styled";
import { BASELINE } from "~/settings/typography";
import { rem } from "~/utils";
import COLOURS from "~/settings/colours";

const HeadingInner = styled("span")`
  display: flex;
  align-items: flex-start;
`;

const Icon = styled("svg")`
  height: ${rem(BASELINE)};
  width: ${rem(BASELINE)};
  display: block;
  margin-right: ${rem(BASELINE / 2)};
  fill: ${COLOURS.HEADINGS};
  flex: 0 0 auto;
`;

export default function Template({ data }: PageProps<Queries.BlogPostQuery>) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  if (!markdownRemark || !markdownRemark.frontmatter) {
    throw new Error("Could not read markdown");
  }
  const { frontmatter, html } = markdownRemark;
  const {
    title,
    description,
    date,
    heroVideos,
    heroVideoAutoPlay,
    heroImages,
    contentUrl,
    xrMa,
  } = frontmatter;
  const mediaPath = `static/assets/`;
  const videoPath =
    heroVideos && heroVideos.length && heroVideos[0] !== ""
      ? `${mediaPath}${heroVideos[0]}`
      : undefined;
  const hasMedia = !!videoPath || (heroImages && heroImages.length > 0);
  console.log(description);
  return (
    <PageWrapper>
      <SEO title={title || ""} description={description || ""} />
      <HeadingBackground>{title}</HeadingBackground>
      <ArticleWrapper>
        <Article hasMedia={!!hasMedia}>
          <ArticleContent>
            {(videoPath || heroImages) && (
              <ArticleHeaderMedia
                videoPath={videoPath}
                heroVideoAutoPlay={!!heroVideoAutoPlay}
                heroImages={heroImages}
              />
            )}
            {date && (
              <Heading element={"time"} marginBottom={2}>
                {date}
              </Heading>
            )}
            {xrMa ? (
              <Heading element={"h4"} marginBottom={2}>
                <HeadingInner>
                  <Icon
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    viewBox="0 -960 960 960"
                    width="48"
                  >
                    <path d="M479-120 189-279v-240L40-600l439-240 441 240v317h-60v-282l-91 46v240L479-120Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127v-168L479-360 249-485v170l230 127Zm1-240Zm-1 74Zm0 0Z" />
                  </Icon>
                  <span>
                    Produced while studying on MA Virtual and Extended Realities
                    at UWE, Bristol
                  </span>
                </HeadingInner>
              </Heading>
            ) : (
              ""
            )}
            {description && (
              <Heading
                element={"h2"}
                sizeS={2}
                sizeM={3}
                marginBottomS={3}
                marginBottomM={6}
              >
                {description}
              </Heading>
            )}
            {html && <BodyText dangerouslySetInnerHTML={{ __html: html }} />}
            {contentUrl && (
              <span>
                <CTA href={contentUrl}>View work</CTA>
              </span>
            )}
          </ArticleContent>
        </Article>
      </ArticleWrapper>
    </PageWrapper>
  );
}

Template.propTypes = {
  pageTitle: PropTypes.string,
  data: PropTypes.object,
};

export const pageQuery = graphql`
  query BlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "DD MMMM YYYY")
        title
        description
        heroVideos
        heroVideoAutoPlay
        heroImages {
          image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          caption
          alt
        }
        category
        contentUrl
        xrMa
      }
    }
  }
`;
