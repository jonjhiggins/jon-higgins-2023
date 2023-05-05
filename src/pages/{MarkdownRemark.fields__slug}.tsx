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
  } = frontmatter;
  const mediaPath = `static/assets/`;
  const videoPath =
    heroVideos && heroVideos.length && heroVideos[0] !== ""
      ? `${mediaPath}${heroVideos[0]}`
      : null;
  const hasMedia = videoPath !== null || (heroImages && heroImages.length > 0);
  return (
    <PageWrapper>
      <SEO title={title} />
      <HeadingBackground>{title}</HeadingBackground>
      <ArticleWrapper>
        <Article hasMedia={!!hasMedia}>
          <ArticleContent>
            {(videoPath || heroImages) && (
              <ArticleHeaderMedia
                videoPath={videoPath}
                heroVideoAutoPlay={heroVideoAutoPlay}
                heroImages={heroImages}
              />
            )}
            {date && (
              <Heading element={"time"} marginBottom={2}>
                {date}
              </Heading>
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
            <BodyText dangerouslySetInnerHTML={{ __html: html }} />
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
      }
    }
  }
`;
