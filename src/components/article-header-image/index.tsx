import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { StaticQuery, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import Heading from "~/components/heading";
import COLOURS from "~/settings/colours";
import { HERO_IMAGE_SHADOW } from "~/settings/shadows";

const HeroImages = styled("div")`
  box-shadow: ${HERO_IMAGE_SHADOW};

  &,
  div > & {
    grid-column: article-full;
  }
`;

const Figure = styled("figure")`
  margin: 0;
  text-align: center;

  figcaption {
    background-color: ${COLOURS.WHITE};
    text-transform: uppercase;
  }
`;

export default function ArticleHeaderImages({ heroImages }) {
  return (
    <HeroImages>
      <Figure>
        <GatsbyImage
          image={heroImages[0].image.childImageSharp.gatsbyImageData}
          alt={heroImages[0].alt}
        />
        {heroImages[0].caption && (
          <Heading element={"figcaption"} size={1}>
            {heroImages[0].caption}
          </Heading>
        )}
      </Figure>
    </HeroImages>
  );
}

ArticleHeaderImages.propTypes = {
  heroImages: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      caption: PropTypes.string,
      alt: PropTypes.alt,
    })
  ),
};
