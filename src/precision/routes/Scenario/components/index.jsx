import React, {Component} from 'react';
import ScenarioHeader from "./ScenarioHeader/Header";
import ToolBar from "./View/Toolbar/ToolBar";

export class Scenario extends Component {
    render() {
        return (
            <div>
                <ToolBar/>
            </div>
        );
    }
}

export default Scenario;