import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";
import {Provider} from 'react-redux';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./Auth/components";
import store from "../config/store"

import requireAuth from '../hoc/require-auth';
import requireUnAuth from '../hoc/require-un-auth';

import Header from "./Case/components/Solve/ScenarioHeader/Header";
import CaseList from "./Case/components/List";
import AllCases from "./Case/components/List/AllCases";
import CaseDetail from "./Case/components/Detail";
import CaseSolve from "./Case/components/Solve";
import CaseListHeader from "./Case/components/List/CaseListHeader";
import CreateCase from "./Case/components/Create";
import BusinessGoal from "./Case/components/Create/BusinessGoal";
import Recommendations from "./Case/components/Create/Recommendations";
import CaseInfo from "./Case/components/Create/CaseInfo";
import {CreateCaseHeader} from "./Case/components/Create/CreateCaseHeader";

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
        <Route path="/cases">
            <CaseListHeader>
                <Route exact  path="/cases" component={CaseList}/>
                <Route exact path="/cases/all_cases" component={AllCases}/>
            </CaseListHeader>
        </Route>
        {/*<Route exact path="/cases/:case_id" component={CaseDetail}/>*/}
    </Switch>
);
const CaseCreateRoutes = () => (
    <Switch>
        <Route  path="/create">
            <CreateCaseHeader history={history}>
                <Route exact path="/create" component={BusinessGoal}/>
                <Route exact path="/create/our_recommendations" component={Recommendations}/>
                <Route exact path="/create/case_info" component={CaseInfo}/>
            </CreateCaseHeader>
        </Route>
    </Switch>
);

const AuthRoutes = () => (
    <Switch>
        <Route  path="/cases/:case_id/:scenario_id" component={ScenarioRoutes} />
        <Route  path="/cases" component={CaseRoutes} />
        <Route  path="/create" component={CaseCreateRoutes}/>
        <Redirect to="/cases"/>
    </Switch>
);

export default (props) => {
    return (
      <Provider store={store}>
          <Router history={history}>
              <ToastContainer  transition={Slide}/>
            <Switch>
                <Route path="/auth/login" component={requireUnAuth(Login)} />
                <Route path="/" component={requireAuth(AuthRoutes)}/>
            </Switch>
          </Router>
        </Provider>
    );
};

