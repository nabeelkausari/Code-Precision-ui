import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';

import ScenarioHeader from "./Scenario/components/ScenarioHeader/Header";
import Scenario from "./Scenario/components";
import Login from "./Auth/components";
import store from "../config/store"

import requireAuth from '../hoc/require-auth';
import requireUnAuth from '../hoc/require-un-auth';

export const history = createBrowserHistory();

const ScenarioHeaderComp = () => (
  <ScenarioHeader>
    <Route path="/cases/:case_id/:scenario_id/" component={Scenario}/>
  </ScenarioHeader>
)

export default (props) => {
    return (
      <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path="/cases" component={requireAuth(ScenarioHeaderComp)} />
              <Route path="/auth/login" component={requireUnAuth(Login)} />
              <Redirect from="/" to="/cases" />
            </Switch>
          </Router>
        </Provider>
    );
};
