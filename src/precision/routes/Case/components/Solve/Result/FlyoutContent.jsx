import React, { Component } from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ResultFlyout from "./ResultFlyout";
import Notes from "../View/Notes/Notes";

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
        console.log(key)
        return (
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => this.setKey(k)}>
                <Tab eventKey={0} title="Results">
                   <ResultFlyout results={this.props.is_primary_step_set ? this.props.result1 : this.props.result2}/>
                </Tab>
                <Tab eventKey={1} title="Code">
                    Code
                </Tab>
                <Tab eventKey={2} title="Notes" >
                   Notes
                </Tab>
            </Tabs>
        );
    }
}