import React, { Component } from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ResultFlyout from "./ResultFlyout";
import UserCode from "./UserCode";
import './flyout.scss'

import {results_icon, tv_icon} from '../../../../../images/index'

export class FlyoutContent extends Component {

    state = {
      key: 0
    };

    setKey = (k) => {
        this.setState({
            key: k
        })
    };



    handleSelect = (key) => {
        this.setKey(key)
    }

    render() {
        const { key } = this.state;
        const {is_primary_step_set, results_primary , results_secondary, secondary, code_primary, code_secondary} = this.props;
        return (
            <div className="tabs-container">
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(key) => this.handleSelect(key)}>
                    <Tab eventKey={0} title={<span> <img className="icon-result" src={results_icon} alt="results icon"/> <span> Results</span></span>}>
                        {is_primary_step_set && results_primary &&
                        <ResultFlyout results={ secondary? results_secondary : results_primary}/>
                        }
                    </Tab>
                    <Tab eventKey={1}  title={<span> <img className="icon-code" src={tv_icon} alt="code icon"/> <span> Code</span></span>}>
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
            </div>
        );
    }
}