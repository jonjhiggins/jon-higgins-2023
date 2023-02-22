import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import Transition from "~/components/transition";
import { Helmet } from "react-helmet";
import SiteHeader from "~/components/site-header";
import Typography from "~/components/typography";
import BaselineGrid from "~/components/baseline-grid";
import { MAX_WIDTH_REM } from "~/settings/max-width";
import { BASELINE } from "~/settings/typography";
import COLOURS from "~/settings/colours";
import { BREAKPOINTS_RAW, BREAKPOINTS } from "~/settings/breakpoints";
import { rem } from "~/utils";
import favicon from "~/images/favicon.png";
// Accessibility
import "what-input";
// Polyfills
// @TODO - do dynamic import
import "url-search-params-polyfill";
// Fonts
import interUI from "~/fonts/inter-ui-regular.woff2";
import interUIBold from "~/fonts/inter-ui-bold.woff2";
// Source code highoighting CSS
require("prismjs/themes/prism-tomorrow.css");
const HEADER_HEIGHT_S = BASELINE * 5;
const HEADER_HEIGHT_M = BASELINE * 7;
const Wrapper = styled("div") `
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
const MainContent = styled("div") `
  padding-top: ${rem(BASELINE * 2)};
`;
const MEMORY_STORE_KEYS = {
    LAST_SCROLL_Y: "lastScrollY",
    WAITING_FOR_ANIMATION_FRAME: "waitingForAnimationFrame",
};
/** outside of state for performance */
const memoryStore = {
    _data: new Map(),
    get(key) {
        if (!key) {
            return null;
        }
        return this._data.get(key) || null;
    },
    set(key, data) {
        if (!key) {
            return;
        }
        return this._data.set(key, data);
    },
};
const mediaQueryList = typeof window === "undefined"
    ? null
    : window.matchMedia(`(min-width: ${BREAKPOINTS_RAW.M}px)`);
/**
 * Use PureComponent so setState doesn't always trigger componentDidUpdate
 */
class LayoutComponent extends React.PureComponent {
    constructor() {
        super();
        this.handleScrollBound = this.handleScroll.bind(this);
        this.handleBreakpointChangeBound = this.handleBreakpointChange.bind(this);
        /* Probably should be global state... */
        this.state = {
            breakpointSmall: true,
            headerFixed: false,
            headerFoldUp: false,
            navOpen: false,
        };
    }
    componentDidMount() {
        // No window in server rendered version
        if (typeof window === "undefined") {
            return;
        }
        // Set memory store inital values
        memoryStore.set(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME, false);
        memoryStore.set(MEMORY_STORE_KEYS.LAST_SCROLL_Y, 0);
        window.addEventListener("scroll", this.handleScrollBound);
        // Set up media query listeners (header different height on big screen)
        this.setState({ breakpointSmall: !mediaQueryList.matches });
        mediaQueryList.addListener(this.handleBreakpointChangeBound);
    }
    componentWillUnmount() {
        // No window in server rendered version
        if (typeof window === "undefined") {
            return;
        }
        window.removeEventListener("scroll", this.handleScrollBound);
        mediaQueryList.removeListener(this.handleBreakpointChangeBound);
    }
    /**
     * Handle user scroll event - collapse the header
     */
    handleScroll() {
        const { scrollY } = window;
        const scrollingUp = scrollY < memoryStore.get(MEMORY_STORE_KEYS.LAST_SCROLL_Y);
        memoryStore.set(MEMORY_STORE_KEYS.LAST_SCROLL_Y, scrollY);
        if (memoryStore.get(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME)) {
            return;
        }
        const scrollTriggerPoint = this.state.breakpointSmall
            ? HEADER_HEIGHT_S
            : HEADER_HEIGHT_M;
        const headerFixed = scrollY > scrollTriggerPoint;
        window.requestAnimationFrame(this.fixUnFixHeader.bind(this, headerFixed, scrollingUp));
        memoryStore.set(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME, true);
    }
    /**
     * Handle breakpoint change
     * @param {MediaQueryListEvent} e
     */
    handleBreakpointChange(e) {
        const isSmallScreen = !e.matches;
        this.setState({ breakpointSmall: isSmallScreen });
        // Close the small screen menu when switching to large screen
        if (!isSmallScreen) {
            this.setState({ navOpen: false });
        }
    }
    /**
     * Fix/unfix site header, fold up/down site header when fixed
     */
    fixUnFixHeader(headerFixed, scrollingUp) {
        // Debounce if waiting for requestAnimationFrame
        memoryStore.set(MEMORY_STORE_KEYS.WAITING_FOR_ANIMATION_FRAME, false);
        if (this.state.navOpen) {
            return;
        }
        this.setState({
            headerFixed,
            headerFoldUp: headerFixed,
        });
        if (headerFixed && scrollingUp) {
            this.setState({ headerFoldUp: false });
        }
    }
    /**
     * Toggle small screen menu
     */
    handleNavToggleClick() {
        this.setState({ navOpen: !this.state.navOpen });
        if (!this.state.navOpen) {
            return;
        }
        // Nav is open so unfix and fold down the menu
        this.setState({
            headerFixed: false,
            headerFoldUp: false,
        });
    }
    /**
     * Click on link in nav to close small screen menu
     */
    handleMenuClick() {
        this.setState({ navOpen: false });
    }
    render() {
        const { siteData, location, children } = this.props;
        const search = location ? location.search : null;
        const params = search ? new URLSearchParams(search) : null;
        const grid = params ? params.get("grid") : false;
        const hasGrid = grid === "true" || grid === "1";
        return (React.createElement(Wrapper, { headerFixed: this.state.headerFixed },
            React.createElement(Helmet, { title: siteData.site.siteMetadata.title, link: [
                    { rel: "shortcut icon", type: "image/png", href: `${favicon}` },
                ] },
                React.createElement("html", { lang: "en" }),
                React.createElement("link", { rel: "preload", href: interUI, as: "font", type: "font/woff2" }),
                React.createElement("link", { rel: "preload", href: interUIBold, as: "font", type: "font/woff2" })),
            React.createElement(Typography, null),
            hasGrid && React.createElement(BaselineGrid, null),
            React.createElement(SiteHeader, { titleHTML: siteData.site.siteMetadata.titleHTML, navigationLinks: siteData.site.siteMetadata.navigationLinks, headerFixed: this.state.headerFixed, foldUp: this.state.headerFoldUp, handleNavToggleClick: this.handleNavToggleClick.bind(this), handleMenuClick: this.handleMenuClick.bind(this), navOpen: this.state.navOpen }),
            React.createElement(MainContent, null,
                React.createElement(Transition, { location: location }, children))));
    }
}
const Layout = (props) => (React.createElement(StaticQuery, { query: graphql `
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
    `, render: (data) => React.createElement(LayoutComponent, { siteData: data, ...props }) }));
LayoutComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    location: PropTypes.shape().isRequired,
    siteData: PropTypes.shape().isRequired,
};
export default Layout;
