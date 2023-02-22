import { SPACING_RAW } from "~/settings/spacing";
import { rem } from "~/utils";

// http://gridcalculator.dk/#/1248/5/48/48

const GRID_GUTTER = {
  S: SPACING_RAW[3],
  M: SPACING_RAW[4],
};

const GRID_GUTTER_REM = {
  S: rem(GRID_GUTTER.S),
  M: rem(GRID_GUTTER.M),
};

export { GRID_GUTTER, GRID_GUTTER_REM };
