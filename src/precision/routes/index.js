import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';

import Login from "./Auth/components";
import store from "../config/store"

import requireAuth from '../hoc/require-auth';
import requireUnAuth from '../hoc/require-un-auth';
import Header from "./Scenario/components/ScenarioHeader/Header";
import SubHeader from "./Scenario/components/SubHeader/SubHeader";
import { Dashboard } from "./Scenario/components/View/Dashboard/components/Dashboard";
import { Dataset } from "./Scenario/components/View/Dataset/components/Dataset";
import { Console } from "./Scenario/components/View/Console/components/Console";
import { Process } from "./Scenario/components/View/Process/components/Process";

export const history = createBrowserHistory();

const ScenarioRoutes = () => (
  <Header>
    <SubHeader>
      <Switch>
        <Route exact path="/cases/:case_id/:scenario_id" component={Dashboard}/>
        <Route exact path="/cases/:case_id/:scenario_id/dataset" component={Dataset}/>
        <Route exact path="/cases/:case_id/:scenario_id/console" component={Console}/>
        <Route exact path="/cases/:case_id/:scenario_id/process" component={Process}/>
      </Switch>
    </SubHeader>
  </Header>
)

export default (props) => {
    return (
      <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path="/cases" component={requireAuth(ScenarioRoutes)} />
              <Route path="/auth/login" component={requireUnAuth(Login)} />

              <Redirect from="/" to="/cases" />
            </Switch>
          </Router>
        </Provider>
    );
};
