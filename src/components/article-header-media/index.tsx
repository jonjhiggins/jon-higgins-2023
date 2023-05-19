import React from "react";
import styled from "@emotion/styled";

import ArticleHeaderImagesScroll from "~/components/article-header-images-scroll";
import ArticleHeaderImage from "~/components/article-header-image";
import COLOURS from "~/settings/colours";
import { BASELINE } from "~/settings/typography";
import { BREAKPOINTS } from "~/settings/breakpoints";
import { GRID_GUTTER } from "~/settings/grid";
import { rem } from "~/utils";
import { HERO_IMAGE_SHADOW } from "~/settings/shadows";

const ArticleHeaderMediaWrapper = styled("div")`
  background-color: ${COLOURS.PRIMARY};
  padding: ${rem(GRID_GUTTER.S)};
  margin: 0 ${rem(-GRID_GUTTER.S)} ${rem(BASELINE)};

  ${BREAKPOINTS.M_MIN} {
    margin: 0 0 ${rem(BASELINE * 8)};
    padding: ${rem(GRID_GUTTER.M)};
  }

  video,
  img {
    max-width: 100%;
    display: block;
    grid-column: article-full;
    box-shadow: ${HERO_IMAGE_SHADOW};
  }
`;

interface Props {
  heroImages: HeroImages;
  videoPath?: string;
  heroVideoAutoPlay: boolean;
}

export default function ArticleHeaderMedia({
  videoPath,
  heroImages,
  heroVideoAutoPlay,
}: Props) {
  return (
    <ArticleHeaderMediaWrapper>
      {videoPath && (
        <video
          autoPlay={heroVideoAutoPlay}
          muted={heroVideoAutoPlay}
          controls={!heroVideoAutoPlay}
          loop
          poster={require(`../../../${videoPath}.jpg`).default}
        >
          <source
            src={require(`../../../${videoPath}.mp4`).default}
            type="video/mp4"
          />
        </video>
      )}
      {/* Single image hero */}
      {!videoPath && heroImages && heroImages.length === 1 && (
        <ArticleHeaderImage heroImages={heroImages} />
      )}
      {/* Double scrolling images hero */}
      {!videoPath && heroImages && heroImages.length > 1 && (
        <ArticleHeaderImagesScroll heroImages={heroImages} />
      )}
    </ArticleHeaderMediaWrapper>
  );
}
