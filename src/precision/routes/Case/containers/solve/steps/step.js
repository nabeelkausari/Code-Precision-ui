import {connect} from 'react-redux'
import {getUserNotes, resetNotesFlyout} from "../../../../../modules/steps/notes/actions";
import {getSteps, resetResultsFlyouts} from "../../../../../modules/case/actions"

const mapStateToProps = (state, ownProps ) => {

    const undo_requested = state.cases.undo_requested;
    return {
        undo_requested,
        function_execution_succeeded: state.functions.function_execution_succeeded
    }
};

export const StepContainer = connect(mapStateToProps, { getUserNotes, resetNotesFlyout, resetResultsFlyouts, getSteps });