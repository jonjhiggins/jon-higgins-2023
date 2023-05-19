import React, { useEffect, useState } from "react";
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

// Accessibility
import "what-input";

// Source code highlighting CSS
require("prismjs/themes/prism-tomorrow.css");

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

  function handleBreakpointChange(e: MediaQueryListEvent) {
    const isSmallScreen = !e.matches;
    setState((state) => ({
      ...state,
      ...{ breakpointSmall: isSmallScreen },
    }));
    // Close the small screen menu when switching to large screen
    if (!isSmallScreen) {
      setState((state) => ({
        ...state,
        ...{ navOpen: false },
      }));
    }
  }

  useEffect(() => {
    console.log("mount");
    if (typeof window === "undefined" || !mediaQueryList) {
      return;
    }

    /**
     * Fix/unfix site header, fold up/down site header when fixed
     */
    function fixUnFixHeader(headerFixed: boolean, scrollingUp: boolean) {
      // Debounce if waiting for requestAnimationFrame
      memoryStore.set(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME, false);

      if (state.navOpen) {
        return;
      }

      setState((state) => ({
        ...state,
        ...{
          headerFixed,
          headerFoldUp: headerFixed,
        },
      }));

      if (headerFixed && scrollingUp) {
        setState((state) => ({
          ...state,
          ...{ headerFoldUp: false },
        }));
      }
    }

    function handleScroll() {
      console.log("handle scroll");
      const { scrollY } = window;
      const scrollingUp =
        scrollY < memoryStore.get(MEMORY_STORE_KEYS.LAST_SCROLL_Y);
      memoryStore.set(MEMORY_STORE_KEYS.LAST_SCROLL_Y, scrollY);

      if (memoryStore.get(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME)) {
        return;
      }

      const scrollTriggerPoint = state.breakpointSmall
        ? HEADER_HEIGHT_S
        : HEADER_HEIGHT_M;
      const headerFixed = scrollY > scrollTriggerPoint;
      window.requestAnimationFrame(
        fixUnFixHeader.bind(null, headerFixed, scrollingUp)
      );

      memoryStore.set(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME, true);
    }

    // Set memory store inital values
    memoryStore.set(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME, false);
    memoryStore.set(MEMORY_STORE_KEYS.LAST_SCROLL_Y, 0);

    window.addEventListener("scroll", handleScroll);

    // Set up media query listeners (header different height on big screen)
    setState((state) => ({
      ...state,
      ...{ breakpointSmall: !mediaQueryList.matches },
    }));
    mediaQueryList.addEventListener("change", handleBreakpointChange);

    // Clean-up on unmount component
    return function () {
      console.log("unmount");
      // No window in server rendered version
      if (typeof window === "undefined") {
        return;
      }
      window.removeEventListener("scroll", handleScroll);
      mediaQueryList.removeEventListener("change", handleBreakpointChange);
    };
  }, [state.breakpointSmall, state.navOpen]);

  /**
   * Toggle small screen menu
   */
  function handleNavToggleClick() {
    setState((state) => ({ ...state, ...{ navOpen: !state.navOpen } }));
    if (!state.navOpen) {
      return;
    }
    // Nav is open so unfix and fold down the menu
    setState((state) => ({
      ...state,
      ...{
        headerFixed: false,
        headerFoldUp: false,
      },
    }));
  }
  /**
   * Click on link in nav to close small screen menu
   */
  function handleMenuClick() {
    setState((state) => ({ ...state, ...{ navOpen: false } }));
  }

  const search = location ? location.search : null;
  const params = search ? new URLSearchParams(search) : null;
  const grid = params ? params.get("grid") : false;
  const hasGrid = grid === "true" || grid === "1";
  return (
    <Wrapper headerFixed={state.headerFixed}>
      <Helmet title={siteData.site.siteMetadata.title}>
        <html lang="en" />
        <link rel="preload" href={interUI} as="font" type="font/woff2" />
        <link rel="preload" href={interUIBold} as="font" type="font/woff2" />
        <link rel="shortcut icon" type="image/png" href={favicon}></link>
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
