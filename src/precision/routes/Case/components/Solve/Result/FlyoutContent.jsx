import React, { Component } from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ResultFlyout from "./ResultFlyout";
import Notes from "../View/Notes/Notes";
import UserCode from "./UserCode";

export class FlyoutContent extends Component {

    state = {
      key: 0
    };

    setKey = (k) => {
        this.setState({
            key: k
        })
    };
    //
    // componentDidMount() {
    //     if(this.props.result1) {
    //         this.props.getUserNotes(this.props.result1);
    //         this.props.userPythonCode(this.props.result1);
    //         this.props.userRCode(this.props.result1);
    //         this.props.userCode(this.props.result1)
    //     }
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.result1 && this.props.result1 !== prevProps.result1){
    //         this.props.getUserNotes(this.props.result1);
    //         this.props.userPythonCode(this.props.result1);
    //         this.props.userRCode(this.props.result1);
    //         this.props.userCode(this.props.result1)
    //     }
    // }

    handleCode = (result) => {
        debugger;
        console.log("RESULT : ", result)
        const { secondary } = this.props;
        this.props.userPythonCode(result, secondary ? 'secondary' : 'primary');
        this.props.userRCode(result, secondary ? 'secondary' : 'primary');
        this.props.userCode(result, secondary ? 'secondary' : 'primary')
    }

    render() {
        const { key } = this.state;
        const {is_primary_step_set, result1 , secondary, result2, is_secondary_step_set, code_primary, code_secondary} = this.props;
        debugger;
        const result = !this.props.secondary ? this.props.result1 : this.props.result2;
        console.log("SECONDARY : ", secondary)
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
                    {is_primary_step_set &&
                        <UserCode code = {secondary? code_secondary : code_primary} handleCode = {this.handleCode} result = {result} secondary = {secondary}/>
                    }
                </Tab>
                {/*<Tab eventKey={2} title="Notes" >*/}
                {/*    {is_primary_step_set &&*/}
                {/*    ( !secondary )*/}
                {/*        ? <Notes results={result} secondary={secondary} />*/}
                {/*        : is_secondary_step_set && <Notes results={result} secondary={secondary} />*/}
                {/*    }*/}
                {/*</Tab>*/}
            </Tabs>
        );
    }
}