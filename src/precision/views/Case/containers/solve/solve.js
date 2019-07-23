import { connect } from 'react-redux';
import {getScenarioDetails, getCaseAndScenario, getSteps} from "../../../../modules/case/actions"
import {getCategoryAndFunctions} from "../../../../modules/case/toolbar/actions";

const mapStateToProps = (state, props) =>{
    const { cases: { info,steps,case_loading, steps_loading,  fetch_case_succeeded, fetch_steps_succeeded,
        results : { is_primary_flyout_open, is_secondary_flyout_open}},
        notes: { show_notes_flyout , notes_info}, functions:{function_categories_loading, functions_loading} } = state;
    return {
        info,
        steps,
        fetch_case_succeeded,
        fetch_steps_succeeded,
        is_primary_flyout_open,
        is_secondary_flyout_open,
        show_notes_flyout,
        notes_info,
        is_fetching: steps_loading || function_categories_loading || functions_loading || case_loading,
        current_case: state.cases.current_case
    }
}


export const SolveContainer = connect(mapStateToProps, {getScenarioDetails, getSteps, getCategoryAndFunctions, getCaseAndScenario});
