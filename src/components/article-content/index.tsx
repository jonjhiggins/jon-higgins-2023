import styled from "@emotion/styled";

import { BREAKPOINTS } from "~/settings/breakpoints";
import { GRID_GUTTER_REM } from "~/settings/grid";
import { BASELINE } from "~/settings/typography";
import { rem } from "~/utils";

const ArticleContent = styled("div")<{ centreGrid?: boolean }>`
  display: inherit;
  grid-template-columns: inherit;
  grid-column-gap: inherit;
  grid-column: article-full;

  & > *:not(div) {
    ${BREAKPOINTS.M_MIN} {
      grid-column: ${(props) => (props.centreGrid ? "article-main" : null)};
    }
  }

  & > div {
    display: inherit;
    grid-template-columns: inherit;
    grid-column-gap: inherit;
    grid-column: article-full;

    & > * {
      ${BREAKPOINTS.M_MIN} {
        grid-column: article-main;
      }
    }

    /* make code blocks full width */
    & > .gatsby-highlight,
    & > .gist {
      ${BREAKPOINTS.M_MIN} {
        grid-column: article-full;
        padding: 0 ${GRID_GUTTER_REM.M} ${rem(BASELINE)};
      }
    }
  }
`;

ArticleContent.defaultProps = {
  centreGrid: true,
};

export default ArticleContent;
