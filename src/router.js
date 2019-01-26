import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import Swapi from "./components/swapi";
import About from "./components/about";

const store = createStore(rootReducer);
store.subscribe(() => console.log("store", store.getState())); // Logging to check store.

const Router = () => (
  <Provider store={store}>
    {" "}
    {/* Provide store using provider from react-redux module. */}
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={Swapi} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default Router;
