import { connect } from 'react-redux';
import {
    getResultsError,
    showPrimaryFlyout,
    hideFlyout,
    fetchUserCode,
    fetchUserLearnR, fetchUserLearnPython
} from "../../../../modules/case/actions"
import {getUserNotes} from "../../../../modules/steps/notes/actions";

function mapStateToProps(state, ownProps) {
    const { cases: {  results :
        {results1, results2, is_primary_flyout_open, is_secondary_flyout_open, is_primary_step_set, is_secondary_step_set},code : {primary, secondary}}}  = state;
    return {
        results1,
        results2,
        is_primary_flyout_open,
        is_secondary_flyout_open,
        is_primary_step_set,
        is_secondary_step_set,
        code_primary : primary,
        code_secondary : secondary
    }
}

export default connect( mapStateToProps, {getResultsError, showPrimaryFlyout, hideFlyout, getUserNotes, fetchUserCode, fetchUserLearnR, fetchUserLearnPython })