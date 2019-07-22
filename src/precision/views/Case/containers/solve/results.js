import { connect } from 'react-redux';
import {getResultsError, showPrimaryFlyout, hideFlyout} from "../../../../modules/case/actions"

function mapStateToProps({ cases: {  results : {results1, results2, is_primary_flyout_open, is_secondary_flyout_open, is_primary_step_set, is_secondary_step_set} } }, ownProps) {
    return {
        results1,
        results2,
        is_primary_flyout_open,
        is_secondary_flyout_open,
        is_primary_step_set,
        is_secondary_step_set
    }
}

export default connect( mapStateToProps, {getResultsError, showPrimaryFlyout, hideFlyout })