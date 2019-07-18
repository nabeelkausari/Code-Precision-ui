import React, {Component} from 'react';
import ToolBar from "./Toolbar/ToolBar";

import SubHeader from "./SubHeader/SubHeader";
import Steps from "./Steps/StepList";
import Dataset from "./View/Dataset/Dataset";


import {SolveContainer} from '../../containers/solve/solve'
import Console from "./View/Console/Console";
import Process from "./View/Process/Process";
import Dashboard from "./View/Dashboard/Dashboard";
import ResultsFlyout from "./Result/ResultFlyout";
import Notes from "./View/Notes/Notes";

class CaseSolve extends Component {

    componentDidMount() {
        this.props.getCase();
        this.props.getCategoryAndFunctions()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {fetch_case_succeeded} = this.props;

        if (fetch_case_succeeded && prevProps.fetch_case_succeeded !== fetch_case_succeeded) {
            this.props.getSteps()
        }
    }

    renderCaseView = () =>{
        switch (this.props.match.params.view) {
            case 'dataset': return <Dataset/>;
            case 'console': return <Console/>;
            case 'process': return <Process/>;
            default: return  <Dashboard />

        }
    };

    renderSteps = () => {
        let route = this.props.match.params.view;
        if (route === 'dataset' || route === 'dashboard') {
            return <Steps/>
        }
    };

    render() {
        const {is_primary_flyout_open, is_secondary_flyout_open, hidePrimaryFlyout, hideSecondaryFlyout, show_notes_flyout, notes_info} = this.props;
        const is_console = this.props.match.params.view === 'console';
        return (
            <div>
                <div style={{display: "flex", overflow : "hidden"}}>
                        <div style={{flex: "1", position: 'relative'}}>
                            <SubHeader/>
                            {!is_console && <ToolBar/>}
                            {this.renderCaseView()}
                            {(is_primary_flyout_open || is_secondary_flyout_open) &&
                                <div className="flyoutContainer">
                                    {is_primary_flyout_open && <ResultsFlyout hideFlyout={hidePrimaryFlyout}/>}
                                    {is_secondary_flyout_open &&
                                    <ResultsFlyout secondary hideFlyout={hideSecondaryFlyout}/>}
                                </div>
                            }
                            {!!show_notes_flyout && <Notes notes={notes_info}/>}
                        </div>
                        {this.renderSteps()}
                    </div>
            </div>)
    }
}


export default SolveContainer(CaseSolve);
