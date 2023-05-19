import styled from "@emotion/styled";

import COLOURS from "~/settings/colours";
import { BASELINE_REM } from "~/settings/typography";

/**
 * Add a baseline grid to document or an individual component
 * @type {ReactElement}
 */
const BaselineGrid = styled("div")<{
  lines?: number;
  colour?: string;
  top?: number;
}>(
  {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.3,
    zIndex: 1000,
    pointerEvents: "none",
  },
  ({ lines = 1, colour = COLOURS.PRIMARY, top = 0 }) => {
    return {
      top,
      background: `repeating-linear-gradient(${colour}, ${colour} 1px, transparent 1px, transparent ${
        BASELINE_REM * lines
      }rem)`,
    };
  }
);

export default BaselineGrid;
