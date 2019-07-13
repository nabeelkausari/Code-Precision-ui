import { connect } from 'react-redux';
import {getCase, getSteps, hidePrimaryFlyout, hideSecondaryFlyout} from "../../../../modules/case/actions"
import {getCategoryAndFunctions} from "../../../../modules/case/toolbar/actions";

const mapStateToProps = ({ cases: { info,steps,  fetch_case_succeeded, fetch_steps_succeeded }, notes: { show_notes_flyout , notes_info} }) => ({
const mapStateToProps = ({ cases: { info,steps,  fetch_case_succeeded, fetch_steps_succeeded,  results : { is_primary_flyout_open, is_secondary_flyout_open} } }) => ({
    info,
    steps,
    fetch_case_succeeded,
    fetch_steps_succeeded,
    is_primary_flyout_open,
    is_secondary_flyout_open,
    show_notes_flyout,
    notes_info
});


export const SolveContainer = connect(mapStateToProps, {getCase, getSteps, getCategoryAndFunctions});