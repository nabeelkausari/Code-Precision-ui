import { connect } from 'react-redux';
import {
    getResultsError,
    hideFlyout,
    fetchUserCode,
    fetchUserLearnR,
    fetchUserLearnPython,
} from "../../../../modules/case/actions"
import {getUserNotes} from "../../../../modules/steps/notes/actions";

function mapStateToProps(state, ownProps) {
    const {cases : {
                flyout : {primary, secondary}}} = state
    return {

        is_primary_flyout_open : primary.is_open,
        is_secondary_flyout_open : secondary.is_open,
        is_primary_step_set : primary.is_step_set,
        is_secondary_step_set : secondary.is_step_set,


        results_primary : primary.step,
        results_secondary : secondary.step,

        code_primary : primary.code,
        code_secondary : secondary.code
    }
}

export default connect( mapStateToProps, {getResultsError, hideFlyout, getUserNotes, fetchUserCode, fetchUserLearnR, fetchUserLearnPython })