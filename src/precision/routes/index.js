import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Scenario/components/ScenarioHeader/Header";
import SubHeader from "./Scenario/components/SubHeader/SubHeader";
import { Scenario } from "./Scenario/components";
import { Dashboard } from "./Scenario/components/View/Dashboard/components/Dashboard";
import { Dataset } from "./Scenario/components/View/Dataset/components/Dataset";
import { Console } from "./Scenario/components/View/Console/components/Console";
import { Process } from "./Scenario/components/View/Process/components/Process";

export default (props) => {
    return (
        <Router>
            <Switch>
                <Route path="/cases/:case_id/:scenario_id">
                    <Header>
                        <SubHeader>
                            <Switch>
                            {/*<Route exact path="/cases/:case_id/:scenario_id" component={Scenario}/>*/}
                            <Route exact path="/cases/:case_id/:scenario_id" component={Dashboard}/>
                            <Route exact path="/cases/:case_id/:scenario_id/dataset" component={Dataset}/>
                            <Route exact path="/cases/:case_id/:scenario_id/console" component={Console}/>
                            <Route exact path="/cases/:case_id/:scenario_id/process" component={Process}/>
                            </Switch>
                        </SubHeader>
                    </Header>
                </Route>
            </Switch>
        </Router>
    );
};