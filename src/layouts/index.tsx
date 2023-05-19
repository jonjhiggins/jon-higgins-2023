import React, { useState } from "react";
import "what-input";
import "url-search-params-polyfill";
import interUI from "~/fonts/inter-ui-regular.woff2";
import interUIBold from "~/fonts/inter-ui-bold.woff2";
import { BASELINE } from "~/settings/typography";
import styled from "@emotion/styled";
import { MAX_WIDTH_REM } from "~/settings/max-width";
import { BREAKPOINTS, BREAKPOINTS_RAW } from "~/settings/breakpoints";
import COLOURS from "~/settings/colours";
import { rem } from "~/utils";
import { Helmet } from "react-helmet";
import BaselineGrid from "~/components/baseline-grid";
import SiteHeader from "~/components/site-header";
import Transition from "~/components/transition";
import Typography from "~/components/typography";
import { useStaticQuery, graphql, PageProps } from "gatsby";
import favicon from "~/images/favicon.png";

// Source code highlighting CSS
require("prismjs/themes/prism-tomorrow.css");

interface Props {
  children: React.ReactNode;
  location: unknown;
}

interface LayoutState {
  breakpointSmall: boolean;
  headerFixed: boolean;
  headerFoldUp: boolean;
  navOpen: boolean;
}

const HEADER_HEIGHT_S = BASELINE * 5;
const HEADER_HEIGHT_M = BASELINE * 7;

const Wrapper = styled("div")<{ headerFixed: boolean }>`
  max-width: ${MAX_WIDTH_REM};
  margin: 0 auto;
  box-shadow: 0 ${rem(BASELINE * 3)} ${rem(BASELINE * 3)} ${COLOURS.SHADOW};
  overflow: hidden; /* stop box shadow showing at bottom of element  */
  display: flex;
  min-height: 100%;
  flex-direction: column;
  position: relative;
  padding-top: ${(props) => (props.headerFixed ? rem(HEADER_HEIGHT_S) : "")};

  ${BREAKPOINTS.M_MIN} {
    padding-top: ${(props) => (props.headerFixed ? rem(HEADER_HEIGHT_M) : "")};
  }
`;

const MainContent = styled("div")`
  padding-top: ${rem(BASELINE * 2)};
`;

const MEMORY_STORE_KEYS = {
  LAST_SCROLL_Y: "lastScrollY",
  WAITING_FOR_ANIMATION_FRAME: "waitingForAnimationFrame",
};

/** outside of state for performance */
const memoryStore = {
  _data: new Map(),
  get(key: string) {
    if (!key) {
      return null;
    }

    return this._data.get(key) || null;
  },
  set(key: string, data: unknown) {
    if (!key) {
      return;
    }
    return this._data.set(key, data);
  },
};

const mediaQueryList =
  typeof window === "undefined"
    ? null
    : window.matchMedia(`(min-width: ${BREAKPOINTS_RAW.M}px)`);

export default function Layout({ children, location }: PageProps) {
  const siteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          titleHTML
          navigationLinks {
            name
            link
          }
        }
      }
    }
  `);

  const [state, setState] = useState<LayoutState>({
    breakpointSmall: true,
    headerFixed: false,
    headerFoldUp: false,
    navOpen: false,
  });
  const search = location ? location.search : null;
  const params = search ? new URLSearchParams(search) : null;
  const grid = params ? params.get("grid") : false;
  const hasGrid = grid === "true" || grid === "1";

  function handleNavToggleClick() {}
  function handleMenuClick() {}
  return (
    <Wrapper headerFixed={state.headerFixed}>
      <Helmet
        title={siteData.site.siteMetadata.title}
        link={[{ rel: "shortcut icon", type: "image/png", href: `${favicon}` }]}
      >
        <html lang="en" />
        <link rel="preload" href={interUI} as="font" type="font/woff2" />
        <link rel="preload" href={interUIBold} as="font" type="font/woff2" />
      </Helmet>
      <Typography />
      {hasGrid && <BaselineGrid />}
      <SiteHeader
        titleHTML={siteData.site.siteMetadata.titleHTML}
        navigationLinks={siteData.site.siteMetadata.navigationLinks}
        headerFixed={state.headerFixed}
        foldUp={state.headerFoldUp}
        handleNavToggleClick={handleNavToggleClick}
        handleMenuClick={handleMenuClick}
        navOpen={state.navOpen}
      />
      <MainContent>
        <Transition location={location}>{children}</Transition>
      </MainContent>
    </Wrapper>
  );
}
