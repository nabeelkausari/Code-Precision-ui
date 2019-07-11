import { connect } from 'react-redux';
import {getCase, getSteps} from "../../../../modules/case/actions"
import {getCategoryAndFunctions} from "../../../../modules/case/toolbar/actions";

const mapStateToProps = ({ case: { info,steps,  fetch_case_succeeded, fetch_steps_succeeded } }) => ({
    info,
    steps,
    fetch_case_succeeded,
    fetch_steps_succeeded
});


export const SolveContainer = connect(mapStateToProps, {getCase, getSteps, getCategoryAndFunctions});