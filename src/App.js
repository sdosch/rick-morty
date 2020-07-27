import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Grommet } from "grommet";
import { ReactQueryDevtools } from "react-query-devtools";

import "./styles.css";
import Layout from "./Layout";

export default function App() {
  const [themeMode, setThemeMode] = useState("light");
  const onChange = (checked) => {
    setThemeMode(checked ? "light" : "dark");
  };

  return (
    <Router>
      <Grommet theme={theme} themeMode={themeMode}>
        <Layout onChange={onChange} />
        <ReactQueryDevtools position="bottom-right" />
      </Grommet>
    </Router>
  );
}

const theme = {
  global: {
    colors: {
      brand: {
        dark: "#444",
        light: "#228BE6",
      },
      background: {
        dark: "#333",
        light: "#fff",
      },
      "background-back": {
        dark: "#222",
        light: "#eee",
      },
      "background-front": {
        dark: "#333",
        light: "#fff",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
    focus: {
      border: {
        color: "transparent",
      },
    },
  },
};
