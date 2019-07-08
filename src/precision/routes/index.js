import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Scenario/components/ScenarioHeader/Header";
import { Scenario } from "./Scenario/components";
import { Dashboard } from "./Scenario/components/View/Dashboard/components/Dashboard";
import SubHeader from "./Scenario/components/SubHeader/SubHeader";


export default (props) => {
    return (
        <Router>
            <Switch>
                <Route path="/cases/:case_id/:scenario_id">
                    <Header>
                        <SubHeader>
                            <Route exact path="/cases/:case_id/:scenario_id" component={Scenario}/>
                            <Route exact path="/cases/:case_id/:scenario_id/Dashboard" component={Dashboard}/>
                            <Route exact path="/cases/:case_id/:scenario_id/Data_Set" component={Dashboard}/>
                            <Route exact path="/cases/:case_id/:scenario_id/Dashboard" component={Dashboard}/>
                            <Route exact path="/cases/:case_id/:scenario_id/Dashboard" component={Dashboard}/>
                        </SubHeader>
                    </Header>
                </Route>
            </Switch>
        </Router>
    );
};