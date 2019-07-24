import React, {Component, Fragment} from 'react';
import Flyout from "../../../../../components/Flyout/Flyout";
import OutputContainer from '../../../containers/solve/results';
import {FlyoutContent} from "./FlyoutContent";


class OutputFlyout extends Component {
    render() {

        const {secondary, is_primary_step_set, is_secondary_step_set,
               hideFlyout, note1, note2, results_primary, results_secondary,
                code_primary, code_secondary, fetchUserCode, fetchUserLearnR, fetchUserLearnPython,
                setCurrentFlyoutTab, current_flyout_tab} = this.props;
        return (
            <Fragment>

                <Flyout
                    require_pin = {true}
                    require_download = {true} require_full_screen ={true}

                    sequence_no={results_primary &&
                    !secondary?
                        results_primary.sequence_number
                        :
                        results_secondary && is_secondary_step_set && results_secondary.sequence_number
                    }

                    title={results_primary &&
                    !secondary?
                        results_primary.operation_name
                        :
                        results_secondary && is_secondary_step_set && results_secondary.operation_name
                    }

                    secondary = {secondary}
                    hideFlyout = {hideFlyout}
                >

                    <FlyoutContent
                        secondary={secondary}

                        results_primary={results_primary}
                        results_secondary={results_secondary}

                        code_primary = {code_primary}
                        code_secondary = {code_secondary}

                        note1={note1}
                        note2={note2}

                        is_primary_step_set={is_primary_step_set}
                        is_secondary_step_set={is_secondary_step_set}

                        fetchUserCode = {fetchUserCode}
                        fetchUserLearnR = {fetchUserLearnR}
                        fetchUserLearnPython = {fetchUserLearnPython}

                        setCurrentFlyoutTab={setCurrentFlyoutTab}
                        current_flyout_tab= {current_flyout_tab}
                        />

                </Flyout>
            </Fragment>

        );
    }
}

export default OutputContainer(OutputFlyout);
