import {connect} from 'react-redux'
import {getUserNotes, resetNotesFlyout} from "../../../../../modules/steps/notes/actions";
import {resetResultsFlyouts} from "../../../../../modules/case/actions"


const mapStateToProps = (state, ownProps ) => {

    const undo_requested = state.cases.undo_requested;
    return {
        undo_requested
    }
};

export const StepContainer = connect(mapStateToProps, { getUserNotes, resetNotesFlyout, resetResultsFlyouts });