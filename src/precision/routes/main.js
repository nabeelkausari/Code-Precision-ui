import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "../views/Auth/components";

import requireAuth from '../hoc/require-auth';
import requireUnAuth from '../hoc/require-un-auth';

import Header from "../views/Case/components/Solve/ScenarioHeader/Header";
import CaseList from "../views/Case/components/List";
import CaseDetail from "../views/Case/components/Detail";
import CaseSolve from "../views/Case/components/Solve";

toast.configure({autoClose:1000})

export const history = createBrowserHistory();

const ScenarioRoutes = () => (
  <Header>
      <Switch>
        <Route exact path="/cases/:case_id/:scenario_id/:view" component={CaseSolve}/>
        {/*<Route exact path="/cases/:case_id/:scenario_id/dataset" component={Dataset}/>*/}
        {/*<Route exact path="/cases/:case_id/:scenario_id/console" component={Console}/>*/}
        {/*<Route exact path="/cases/:case_id/:scenario_id/process" component={Process}/>*/}
      </Switch>
  </Header>
);

const CaseRoutes = () => (
    <Switch>
        <Route exact path="/cases" component={CaseList}/>
        <Route exact path="/cases/:case_id" component={CaseDetail}/>
    </Switch>
);

export const MainRoutes = () => (
  <Switch>
    <Route path="/cases/:case_id/:scenario_id" component={requireAuth(ScenarioRoutes)} />
    <Route path="/cases" component={requireAuth(CaseRoutes)} />
    <Route path="/auth/login" component={requireUnAuth(Login)} />
    <Redirect from="/" to="/cases" />
  </Switch>
);


