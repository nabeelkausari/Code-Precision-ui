import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Scenario/components/ScenarioHeader/Header";
import Scenario from "./Scenario/components";


export default (props) => {
    return (
        <Router>
            <Switch>
                <Route>
                    <Header>
                        <Route exact path="/cases/:case_id/:scenario_id/" component={Scenario}/>
                    </Header>
                </Route>
            </Switch>
        </Router>
    );
};