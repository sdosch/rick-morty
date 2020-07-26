import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Grommet } from "grommet";

import { ReactQueryDevtools } from "react-query-devtools";

import "./styles.css";
import Layout from "./Layout";

export default function App() {
  return (
    <Router>
      <Grommet theme={theme}>
        <Layout />
        <ReactQueryDevtools position="bottom-right" />
      </Grommet>
    </Router>
  );
}

const theme = {
  global: {
    colors: {
      brand: "#228BE6",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};
