import React, { Component, Fragment } from "react";
import Fade from "react-reveal/Fade";
import Wobble from "react-reveal/Wobble";

import Home from "./Home";
import Map from "./map/Map";
export default class ReactReveal extends Component {
  render() {
    return (
      <Fragment>
        <Fade top>
          <Home />
        </Fade>
        <div style={styles.block}>
          <Wobble top>
            <h1 style={styles.title}>{`THIS MAP IS SICK`}</h1>
          </Wobble>
        </div>
        <Fade bottom delay={4000}>
          <Map />
        </Fade>
      </Fragment>
    );
  }
}

const styles = {
  block: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: "#000",
    borderBottom: "1px solid rgba(255,255,255,.2)",
  },
  title: {
    textAlign: "center",
    fontSize: 100,
    color: "#fff",
    fontFamily: "Lato, sans-serif",
    fontWeight: 100,
  },
};
