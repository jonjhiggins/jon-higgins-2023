import React, { CSSProperties, memo } from "react";
import {
  TransitionGroup,
  Transition as ReactTransition,
  TransitionStatus,
} from "react-transition-group";
import PropTypes from "prop-types";
import { PageProps } from "gatsby";

interface TransitionProps {
  children: React.ReactNode;
  location: PageProps["location"];
}

type TransitionStyles = Record<
  TransitionStatus,
  {
    position?: CSSProperties["position"];
    opacity?: CSSProperties["opacity"];
    transition?: CSSProperties["transition"];
  }
>;

// Adapted from https://divdev.io/animating-gatsby-pt/

const timeout = 500;

const getTrasitionStyles: TransitionStyles = {
  entering: {
    position: "absolute",
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0,
  },
  exited: {},
  unmounted: {},
};

const Transition = memo(function Transition({
  children,
  location,
}: TransitionProps) {
  return (
    <TransitionGroup>
      {/* the key is necessary here because our ReactTransition needs to know
    when pages are entering/exiting the DOM */}
      <ReactTransition
        key={location.pathname}
        timeout={{ enter: timeout, exit: timeout }}
      >
        {(status) => (
          <div style={{ ...getTrasitionStyles[status] }}>{children}</div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
});

export default Transition;
