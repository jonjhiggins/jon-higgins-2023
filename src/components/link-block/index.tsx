import React from "react";
import hexRgb from "hex-rgb";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import Heading from "~/components/heading";
import BodyText from "~/components/body-text";
import { BASELINE } from "~/settings/typography";
import { BREAKPOINTS } from "~/settings/breakpoints";
import COLOURS from "~/settings/colours";
import { rem } from "~/utils";

interface Props {
  className?: string;
  link: string;
  frontmatter: Queries.GetSectionPostsFragment["edges"][0]["node"]["frontmatter"];
}

const PRIMARY_RGB = hexRgb(COLOURS.PRIMARY, { format: "array" });
PRIMARY_RGB.pop();

const LinkBlockInner = styled("li")`
  list-style: none;
  margin: 0 0 ${rem(BASELINE * 2)};
  border: ${rem(2)} solid ${COLOURS.PRIMARY};
  position: relative;
  transition: opacity 400ms ease-out;
  ${BREAKPOINTS.M_MIN} {
    grid-column: span 2;
  }
  & > a {
    color: ${COLOURS.GREY_1};
    text-decoration: none;
    padding: ${rem(BASELINE)};
    display: block;
    transition: background-color 400ms ease-out;
    &:hover {
      background-color: rgba(${PRIMARY_RGB.join(",")}, 0.05);
    }
  }
`;

export default function LinkBlock({ className, link, frontmatter }: Props) {
  return (
    <LinkBlockInner className={className}>
      <a href={link}>
        <Heading
          element={"time"}
          size={1}
          marginBottomS={0.25}
          marginBottomM={0.5}
          colour={COLOURS.GREY_2}
        >
          {frontmatter ? frontmatter.date : ""}
        </Heading>
        <Heading
          element={"h3"}
          sizeS={2}
          sizeM={3}
          marginBottomS={0.25}
          marginBottomM={0.5}
        >
          {frontmatter ? frontmatter.title : ""}
        </Heading>
        <BodyText>{frontmatter ? frontmatter.description : ""}</BodyText>
      </a>
    </LinkBlockInner>
  );
}

LinkBlock.propTypes = {
  link: PropTypes.string,
  frontmatter: PropTypes.shape(),
  visible: PropTypes.bool,
  gridWidth: PropTypes.number,
};
