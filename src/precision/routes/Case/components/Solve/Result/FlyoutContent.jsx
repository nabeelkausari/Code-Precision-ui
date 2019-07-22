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

    componentDidMount() {
        if(this.props.result1) {
            this.props.getUserNotes(this.props.result1)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.result1 && this.props.result1 !== prevProps.result1){
            this.props.getUserNotes(this.props.result1)
        }
    }

    render() {
        const { key } = this.state;
        const {is_primary_step_set, result1 , secondary, result2, is_secondary_step_set} = this.props;
        const result = !this.props.secondary ? this.props.result1 : this.props.result2;
        return (
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => this.setKey(k)}>
                <Tab eventKey={0} title="Results">
                    {is_primary_step_set &&
                    (result1 && !secondary )
                        ? <ResultFlyout results={result1}/>
                        : result2 && is_secondary_step_set && <ResultFlyout results={result2}/>
                    }
                </Tab>
                <Tab eventKey={1} title="Code">
                    <UserStepDetails current_step={result}/>
                </Tab>
                <Tab eventKey={2} title="Notes" >
                    {is_primary_step_set &&
                    ( !secondary )
                        ? <Notes results={result} secondary={secondary} />
                        : is_secondary_step_set && <Notes results={result} secondary={secondary} />
                    }
                </Tab>
            </Tabs>
        );
    }
}