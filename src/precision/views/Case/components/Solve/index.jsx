import React, {Component} from 'react';
import ToolBar from "./ToolbarVertical/ToolbarVertical";

// import ToolBar from "./Toolbar/ToolBar";


import SubHeader from "./SubHeader/SubHeader";
import Steps from "./Steps/StepList";
import Dataset from "./View/Dataset/Dataset";


import {SolveContainer} from '../../containers/solve/solve'
import Console from "./View/Console/Console";
import Process from "./View/Process/Process";
import Dashboard from "./View/Dashboard/Dashboard";
import ResultsFlyout from "./Result/ResultFlyout";
import Notes from "./View/Notes/Notes";
import Loader from "../../../../components/Loader";

class CaseSolve extends Component {


    state = {
        is_steps_open : true
    };

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
            case 'dataset': return <Dataset is_steps_open={this.state.is_steps_open}/>;
            case 'console': return <Console/>;
            case 'process': return <Process/>;
            default: return  <Dashboard />

        }
    };

    renderSteps = () => {
        let route = this.props.match.params.view;
        if (route === 'dataset' || route === 'dashboard') {
            return <Steps is_steps_open={this.state.is_steps_open} toggleSteps={this.toggleSteps}/>
        }
    };

    toggleSteps = () => {
        this.setState((state) => ({is_steps_open: !state.is_steps_open}))
    };

    render() {
        const {is_primary_flyout_open, is_secondary_flyout_open, hidePrimaryFlyout, hideSecondaryFlyout, show_notes_flyout, notes_info, is_fetching} = this.props;
        const is_console = this.props.match.params.view === 'console';
        return (
            <div>
                <Loader loading={is_fetching}/>
                <div className="scenario">
                        <div className="scenario__container">
                            <SubHeader/>
                            <div className="scenario__main-content">
                                {!is_console && <ToolBar/>}
                                {this.renderCaseView()}
                            </div>
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
