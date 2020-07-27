import React, { useState } from "react";
import Episodes from "./Episodes";
import Episode from "./Episode";
import Characters from "./Characters";
import Character from "./Character";
import Home from "./Home";
import { Box, Button, CheckBox, Main, Nav } from "grommet";
import { Switch, Route, Link } from "react-router-dom";

export default function Layout({ onChange }) {
  const [checked, setChecked] = useState(false);
  const changeThemeMode = () => {
    onChange(checked);
    setChecked(!checked);
  };
  return (
    <div className="App">
      <Nav direction="row" background="brand" pad="medium">
        <Link to="/">
          <Button plain color="white" label="Home" />
        </Link>
        <Link to="/episodes">
          <Button plain color="white" label="Episodes" />
        </Link>
        <Link to="/characters">
          <Button plain color="white" label="Characters" />
        </Link>
        <Box style={{ marginLeft: "auto" }}>
          <CheckBox
            label="Dark Mode"
            toggle
            checked={checked}
            onChange={changeThemeMode}
          />
        </Box>
      </Nav>
      <Main pad="medium">
        <Switch>
          <Route exact path="/episodes">
            <Episodes />
          </Route>
          <Route exact path="/episodes/:episodeId">
            <Episode />
          </Route>
          <Route exact path="/characters">
            <Characters />
          </Route>
          <Route exact path="/characters/:characterId">
            <Character />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
    </div>
  );
}
