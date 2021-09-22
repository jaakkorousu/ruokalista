import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Edit from "./Edit";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/edit" component={Edit} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
