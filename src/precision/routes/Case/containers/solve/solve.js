import { connect } from 'react-redux';
import {getCase, getSteps} from "../../../../modules/case/actions"
import {getCategoryAndFunctions} from "../../../../modules/case/toolbar/actions";

const mapStateToProps = ({ cases: { info,steps,  fetch_case_succeeded, fetch_steps_succeeded }, notes: { show_notes_flyout , notes_info} }) => ({
    info,
    steps,
    fetch_case_succeeded,
    fetch_steps_succeeded,
    show_notes_flyout,
    notes_info
});


export const SolveContainer = connect(mapStateToProps, {getCase, getSteps, getCategoryAndFunctions});