import React, { Component, Fragment } from "react";
import Fade from "react-reveal/Fade";
import Wobble from "react-reveal/Wobble";

import Home from "./Home";
import NewsPage from "./NewsPage";
export default class ReactReveal extends Component {
  render() {
    return (
      <Fragment>
        <Fade top>
          <Home />
        </Fade>
        <div style={styles.block}>
          <Fragment left>
            <div>
              <p style={styles.title2}>
                We Don't Take You Where You Need To Go
              </p>
              <h1 style={styles.title}>We Take You Where You Want To Go</h1>
            </div>
          </Fragment>
        </div>
        <Fade top>
          <NewsPage />
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
    background: "#1f2937",
    borderBottom: "1px solid rgba(255,255,255,.2)",
  },
  title: {
    textAlign: "center",
    fontSize: 100,
    color: "#fff",
    fontFamily: "Lato, sans-serif",
    fontWeight: 100,
  },
  title2: {
    textAlign: "center",
    fontSize: 50,
    color: "#fff",
    fontFamily: "Lato, sans-serif",
    fontWeight: 100,
  },
};
