import React, {Component, Fragment} from 'react';
import Flyout from "../../../../../components/Flyout/Flyout";
import OutputContainer from '../../../containers/solve/results';
import {FlyoutContent} from "./FlyoutContent";

class OutputFlyout extends Component {
    render() {
        const {secondary, results1, results2, is_primary_step_set, is_secondary_step_set,  hideFlyout} = this.props;
        console.log("PRIMARY STEP : ", is_primary_step_set);
        return (
            <Fragment>
                <Flyout
                    require_pin = {true}
                    require_download = {true} require_full_screen ={true}
                    sequence_no={results1 && !secondary? results1.sequence_number : results2 && is_secondary_step_set && results2.sequence_number}
                    title={results1 && !secondary? results1.operation_name : results2 && is_secondary_step_set && results2.operation_name }
                    secondary = {secondary}
                    hideFlyout = {hideFlyout}
                >
                <FlyoutContent
                    secondary={secondary}
                    is_primary_step_set={is_primary_step_set}
                    result2={results2}
                    result1={results1}
                    is_secondary_step_set={is_secondary_step_set}
                    getUserNotes={this.props.getUserNotes}
                />
                </Flyout>
            </Fragment>

        );
    }
}

export default OutputContainer(OutputFlyout);
