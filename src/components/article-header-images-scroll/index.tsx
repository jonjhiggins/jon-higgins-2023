import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { GatsbyImage } from "gatsby-plugin-image";

import Heading from "~/components/heading";
import COLOURS from "~/settings/colours";
import { HERO_IMAGE_SHADOW } from "~/settings/shadows";

const HeroImages = styled("div")`
  display: flex;
  box-shadow: ${HERO_IMAGE_SHADOW};

  &,
  div > & {
    grid-column: article-full;
  }
`;

const Figure = styled("figure")`
  margin: 0;
  flex-basis: 50%;
  text-align: center;

  figcaption {
    background-color: ${COLOURS.WHITE};
    text-transform: uppercase;
  }
`;

const a = keyframes`
50% {
    transform: translateY(-33.3%);
}
75% {
    transform: translateY(0);
}
75.6% {
    transform: translateY(0);
}
`;

const ImgHolder = styled("span")<{ delay: boolean }>`
  position: relative;
  padding-top: 168.75%;
  overflow: hidden;
  display: block;

  > * {
    position: absolute !important;
    top: 0;
    left: 0;
    max-width: none;
    width: 100%;
    animation: ${a} 12s 3s infinite;
    animation-delay: ${(props) => (props.delay ? "4s" : null)};
  }
`;

interface Props {
  heroImages: NonNullableHeroImages;
}

export default function ArticleHeaderImagesScroll({ heroImages }: Props) {
  if (!heroImages?.[0]?.image?.childImageSharp?.gatsbyImageData) {
    return null;
  }
  return (
    <HeroImages>
      {heroImages.map((heroImage, index) => {
        if (!heroImage?.image?.childImageSharp?.gatsbyImageData) {
          return false;
        }
        return (
          <Figure key={index}>
            <ImgHolder delay={index !== 0}>
              <GatsbyImage
                image={heroImage?.image?.childImageSharp?.gatsbyImageData}
                alt={heroImage.alt || ""}
              />
            </ImgHolder>
            {heroImage.caption ? (
              <Heading element={"figcaption"} size={1}>
                {heroImage.caption}
              </Heading>
            ) : null}
          </Figure>
        );
      })}
    </HeroImages>
  );
}

ArticleHeaderImagesScroll.propTypes = {
  heroImages: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      caption: PropTypes.string,
      alt: PropTypes.string,
    })
  ),
};
