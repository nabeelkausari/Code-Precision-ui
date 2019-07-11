import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';

import Login from "./Auth/components";
import store from "../config/store"

import requireAuth from '../hoc/require-auth';
import requireUnAuth from '../hoc/require-un-auth';

import Header from "./Case/components/Solve/ScenarioHeader/Header";
import SubHeader from "./Case/components/Solve/SubHeader/SubHeader";
import { Dataset } from "./Case/components/Solve/View/Dataset/Dataset";
import { Console } from "./Case/components/Solve/View/Console/Console";
import Process  from "./Case/components/Solve/View/Process/Process";
import CaseList from "./Case/components/List";
import CaseDetail from "./Case/components/Detail";
import CaseSolve from "./Case/components/Solve"

export const history = createBrowserHistory();

const ScenarioRoutes = () => (
  <Header>
    <SubHeader>
      <Switch>
        <Route exact path="/cases/:case_id/:scenario_id" component={CaseSolve}/>
        <Route exact path="/cases/:case_id/:scenario_id/dataset" component={Dataset}/>
        <Route exact path="/cases/:case_id/:scenario_id/console" component={Console}/>
        <Route exact path="/cases/:case_id/:scenario_id/process" component={Process}/>
      </Switch>
    </SubHeader>
  </Header>
);

const CaseRoutes = () => (
    <Switch>
        <Route exact path="/cases" component={CaseList}/>
        <Route exact path="/cases/:case_id" component={CaseDetail}/>
    </Switch>
);

export default (props) => {
    return (
      <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path="/cases/:case_id/:scenario_id" component={requireAuth(ScenarioRoutes)} />
              <Route path="/cases" component={requireAuth(CaseRoutes)} />
              <Route path="/auth/login" component={requireUnAuth(Login)} />
              <Redirect from="/" to="/cases" />
            </Switch>
          </Router>
        </Provider>
    );
};
