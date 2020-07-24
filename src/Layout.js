import React from "react";
import Episodes from "./Episodes";
import Episode from "./Episode";
import Characters from "./Characters";
import Character from "./Character";
import Home from "./Home";
import { Button, Nav } from "grommet";
import { Switch, Route, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="App">
      <Nav direction="row" background="brand" pad="medium">
        <Link to="/">
          <Button label="Home" />
        </Link>
        <Link to="/episodes">
          <Button label="Episodes" />
        </Link>
        <Link to="/characters">
          <Button label="Characters" />
        </Link>
      </Nav>
      <main>
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
      </main>
    </div>
  );
}
