import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
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

export default function Template({ data, pageTitle }) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
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
      <SEO title={pageTitle || title} />
      <HeadingBackground>{title}</HeadingBackground>
      <ArticleWrapper>
        <Article hasMedia={hasMedia}>
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
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM YYYY")
        title
        description
        heroVideos
        heroVideoAutoPlay
        heroImages {
          image
          caption
          alt
        }
        category
        contentUrl
      }
    }
  }
`;
