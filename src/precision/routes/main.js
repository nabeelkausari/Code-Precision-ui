import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';


import requireAuth from '../hoc/require-auth';
import requireUnAuth from '../hoc/require-un-auth';

import Login from "../views/Auth/components";
import CaseSolve from "../views/Case/components/Solve";
import CaseListHeader from "../views/Case/components/List/CaseListHeader";
import BusinessGoal from "../views/Case/components/Create/BusinessGoal";
import Recommendations from "../views/Case/components/Create/Recommendations";
import CaseInfo from "../views/Case/components/Create/CaseInfo";
import {CreateCaseHeader} from "../views/Case/components/Create/CreateCaseHeader";
import Header from "../views/Case/components/Solve/ScenarioHeader/Header";
import AllCases from "../views/Case/components/List/AllCases";
import CaseList from "../views/Case/components/List/index";


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
            <CreateCaseHeader>
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
        <Redirect from="/" to="/cases"/>
    </Switch>
);

export const MainRoutes = () => {
    return (
        <Switch>
            <Route path="/auth/login" component={requireUnAuth(Login)} />
            <Route path="/" component={requireAuth(AuthRoutes)}/>
        </Switch>
    );
};

