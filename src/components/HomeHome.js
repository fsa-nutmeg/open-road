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
              <p style={styles.title}>We Don't Take You Where You Need To Go</p>
              <p style={styles.title}>...</p>
              <h1 style={styles.title}>We Take You Where You Want To Go</h1>
              <p style={styles.title2} className="Paragraph">
                {" "}
                Welcome to Open Road. We created this website with one mission
                in mind: to help motorcyclists find the safest and most scenic
                routes available. Using MapBox GL technologies, any one can plan
                their next road trip while not having to worry about avoiding
                highways and unsafe riding conditions. Additional features
                include saving your favorite trips and exploring our most
                popular trips and news aggregate below.
              </p>
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
    fontSize: 40,
    color: "#fff",
    fontFamily: "Lato, sans-serif",
    fontWeight: "bold",
  },
  title2: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
    fontFamily: "Lato, sans-serif",
    fontWeight: 100,
  },
};
