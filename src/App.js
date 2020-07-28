import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Grommet } from "grommet";
import { ReactQueryDevtools } from "react-query-devtools";

import { theme } from "./themes/theme";
import Layout from "./components/Layout";
import "./styles.css";

export default function App() {
  const [themeMode, setThemeMode] = useState("light");
  const onChange = (checked) => {
    setThemeMode(checked ? "light" : "dark");
  };

  return (
    <Router>
      <Grommet
        theme={theme}
        themeMode={themeMode}
        style={{ minHeight: "100vh" }}
      >
        <Layout onChange={onChange} />
        <ReactQueryDevtools position="bottom-right" />
      </Grommet>
    </Router>
  );
}
