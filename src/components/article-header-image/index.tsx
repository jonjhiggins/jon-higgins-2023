import React from "react";
import styled from "@emotion/styled";
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

interface Props {
  heroImages: NonNullableHeroImages;
}

export default function ArticleHeaderImages({ heroImages }: Props) {
  if (!heroImages?.[0]?.image?.childImageSharp) {
    return null;
  }
  return (
    <HeroImages>
      <Figure>
        <GatsbyImage
          image={heroImages[0].image.childImageSharp.gatsbyImageData}
          alt={heroImages[0].alt || ""}
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
