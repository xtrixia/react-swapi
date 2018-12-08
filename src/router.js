import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Swapi from "./components/swapi";

const Router = () => (
  <BrowserRouter>
		<div>
			<Switch>
				<Route path="/" exact component={Swapi} />
			</Switch>
		</div>
  </BrowserRouter>
);

export default Router;
