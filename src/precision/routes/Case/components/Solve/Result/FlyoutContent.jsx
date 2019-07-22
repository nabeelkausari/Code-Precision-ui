import React, { Component } from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ResultFlyout from "./ResultFlyout";
import Notes from "../View/Notes/Notes";
import UserStepDetails from "../Steps/StepDetails/UserStepDetails";

export class FlyoutContent extends Component {

    state = {
      key: 0
    };

    setKey = (k) => {
        this.setState({
            key: k
        })
    };

    render() {
        const { key } = this.state;
        const result = !this.props.secondary ? this.props.result1 : this.props.result2;
        return (
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => this.setKey(k)}>
                <Tab eventKey={0} title="Results">
                   <ResultFlyout results={result}/>
                </Tab>
                <Tab eventKey={1} title="Code">
                    <UserStepDetails current_step={result}/>
                </Tab>
                <Tab eventKey={2} title="Notes" >
                   <Notes results={result} secondary={this.props.secondary}/>
                </Tab>
            </Tabs>
        );
    }
}