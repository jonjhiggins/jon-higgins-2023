import styled from "@emotion/styled";
import React from "react";
import COLOURS from "~/settings/colours";
import { GRID_GUTTER_REM } from "~/settings/grid";
import { BASELINE_REM } from "~/settings/typography";
import { rem } from "~/utils";
import ANIMATION from "~/settings/animation";
import { keyframes } from "@emotion/react";

const PERSPECTIVE = BASELINE_REM * 60;
const CUBE_HEIGHT = BASELINE_REM * 50;
const CUBE_DEPTH = CUBE_HEIGHT;
const CUBE_Z = CUBE_HEIGHT / 2;

/**
 * Calculate what transform is needed for each cube face
 */
const getCubeFaceTransform = (props) => {
  if (props.side) {
    return `rotateY(${
      props.left ? "-90deg" : "90deg"
    }) translateZ(${CUBE_Z}rem)`;
  }

  return `rotateX(${props.index * 90}deg) translateZ(${CUBE_Z}rem)`;
};

const HomeAnimationWrapper = styled("div")`
  display: flex;
  position: absolute;
  top: 0;
  height: 100vh;
  align-items: center;
  z-index: -1;
  pointer-events: none;

  left: 0;
  right: 0;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;
const BlockList = styled("ul")`
  flex-basis: 100%;
  display: grid;
  grid-gap: ${GRID_GUTTER_REM.S};
`;

const BlockListItem = styled("li")`
  perspective: ${PERSPECTIVE}rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const rotate = keyframes`
  0 {
    transform: translateY(-6rem) rotateY(45deg) rotateX(45deg)
  }

  25% {
    transform:  translateY(-3rem) rotateY(-45deg) rotateX(-45deg)
  }

  25% {
    transform:  translateY(0rem) rotateY(-45deg) rotateX(-135deg)
  }

  100% {
    transform: translateY(-3rem) rotateY(45deg) rotateX(-225deg)
  }
`;

const Cube = styled("ul")`
  position: relative;
  transform-style: preserve-3d;
  position: relative;
  width: ${CUBE_HEIGHT}rem;
  height: ${CUBE_HEIGHT}rem;
  transform: translateZ(${-CUBE_Z}rem) rotateY(45deg) rotateX(45deg);
  animation: ${rotate} 6000ms ${ANIMATION.EASING} infinite alternate;
  margin: 0 auto;
`;

const CubeFace = styled("li")<{
  side?: boolean;
  left?: boolean;
  right?: boolean;
  index: number;
}>`
  border: ${rem(2)} solid ${COLOURS.PRIMARY};
  box-sizing: border-box;
  position: absolute;
  top: 0;
  /* align the right "side" face to right, everything else to left  */
  left: ${(props) => (props.side && props.right ? null : "0")};
  right: ${(props) => (props.side && props.right ? "0" : null)};
  width: ${(props) => (props.side ? `${CUBE_DEPTH}rem` : "100%")};
  z-index: ${(props) => (props.side ? `0` : "1")};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLOURS.WHITE};
  transform: ${(props) => getCubeFaceTransform(props)};
  backface-visibility: hidden;
`;

const faces = [0, 1, 2, 3];

export default function HomeAnimation() {
  return (
    <HomeAnimationWrapper>
      <BlockList>
        <BlockListItem>
          <Cube>
            <CubeFace side={true} left={true} index={0} />
            <CubeFace side={true} right={true} index={0} />
            {faces.map((blockItemIndex) => (
              <CubeFace key={blockItemIndex} index={blockItemIndex}></CubeFace>
            ))}
          </Cube>
        </BlockListItem>
      </BlockList>
    </HomeAnimationWrapper>
  );
}
