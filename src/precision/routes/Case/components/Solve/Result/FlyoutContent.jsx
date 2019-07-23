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

    // componentDidMount() {
    //     debugger
    //     this.setKey(this.props.current_flyout_tab)
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.current_flyout_tab != this.state.key)
    //         this.setKey(this.props.current_flyout_tab)
    // }

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

    // handleCode = (result) => {
    //     console.log("RESULT : ", result)
    //     const { secondary } = this.props;
    //     this.props.userPythonCode(result, secondary ? 'secondary' : 'primary');
    //     this.props.userRCode(result, secondary ? 'secondary' : 'primary');
    //     this.props.userCode(result, secondary ? 'secondary' : 'primary')
    // }

    handleSelect = (key) => {
        this.setKey(key)
        // console.log("RESULT : ", result)
        // console.log("KEY: ", key)
        // if(key == 1)
        // {
        //     const { secondary } = this.props;
        //     this.props.fetchUserCode(result, secondary ? 'secondary' : 'primary')
        //     this.props.fetchUserLearnPython(result, secondary ? 'secondary' : 'primary');
        //     this.props.fetchUserLearnR(result, secondary ? 'secondary' : 'primary');
        // }
    }

    render() {
        const { key } = this.state;
        const {is_primary_step_set, results_primary , results_secondary, secondary, code_primary, code_secondary} = this.props;
        debugger;
        const result = !this.props.secondary ? results_primary : results_secondary;
        return (
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(key) => this.handleSelect(key)}>
                <Tab eventKey={0} title="Results">
                    {is_primary_step_set && results_primary &&
                         <ResultFlyout results={ secondary? results_secondary : results_primary}/>
                    }
                </Tab>
                <Tab eventKey={1} title="Code">
                    {is_primary_step_set &&
                        <UserCode  secondary={secondary} code_primary={code_primary} code_secondary={code_secondary} />
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