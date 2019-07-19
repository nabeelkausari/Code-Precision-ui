import { connect } from "react-redux";
import { pathOr } from "ramda";
import {
    fetchShowCodeSteps,
    fetchShowCodeTabs,
    setCurrentShowCodeTab
} from "../../../../../../modules/steps/userStepDetails/actions";

export const getActiveSteps = (user_steps = []) => {
    return user_steps.filter(user_step => user_step.active && !user_step.is_rollback_step) || [];
};

const mapStateToProps = (state) => {
    const sorted_user_steps = (state.cases.steps) || []
        .sort((a, b) => a.sequence_number - b.sequence_number)
        .map(user_step => user_step);
    if(state.userStepDetails.user_step_details_info === undefined) return ;
    const {userStepDetails: { user_step_details_info, current_tab_reference ,fetch_user_code_succeeded, by_uri}} = state;
    const userSteps = getActiveSteps(sorted_user_steps).filter(step => step.description !== "Preliminary Dataset");
    const userCodeTab = user_step_details_info.filter(tab => tab.category.toUpperCase() === 'USER').filter(tab => tab.name.toUpperCase() === "CODE").shift();
    const learnRTab = user_step_details_info.filter(tab => tab.category.toUpperCase() === 'USER').filter(tab => tab.name.toUpperCase() === "LEARN R").shift();
    const learnSassTab = user_step_details_info.filter(tab => tab.category.toUpperCase() === 'USER').filter(tab => tab.name.toUpperCase() === "LEARN SAS").shift();
    const learnPythonTab = user_step_details_info.filter(tab => tab.category.toUpperCase() === 'USER').filter(tab => tab.name.toUpperCase() === "LEARN PYTHON").shift();
debugger
    const userCodeSteps = (userCodeTab && userCodeTab._links) ? by_uri[userCodeTab._links.self.href] : [];
    const learnRSteps = (learnRTab && learnRTab._links) ? by_uri[learnRTab._links.self.href] : [];
    const learnSasSteps = (learnSassTab && learnSassTab._links) ? by_uri[learnSassTab._links.self.href] : [];
    const learnPythonSteps = (learnPythonTab && learnPythonTab._links) ? by_uri[learnPythonTab._links.self.href] : [];

    return {
        learnRStepsReference: pathOr("", ['_links', 'self', 'href'], learnRTab),
        learnSassStepsReference: pathOr(undefined, ['_links', 'self', 'href'], learnSassTab) !== undefined,
        learnPythonStepsReference: pathOr("", ['_links', 'self', 'href'], learnPythonTab),
        userCodeSteps,
        learnRSteps,
        learnSasSteps,
        learnPythonSteps,
        userSteps,
        fetch_user_step: state.userStepDetails !== undefined && state.userStepDetails.fetch_user_step_details_succeeded
    }

};

export const UserStepDetailsContainer = connect( mapStateToProps, { fetchShowCodeTabs, setCurrentShowCodeTab, fetchShowCodeSteps });