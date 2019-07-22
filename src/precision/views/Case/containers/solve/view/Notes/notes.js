import { connect} from 'react-redux'
import {closeNotesFlyout, getUserNotes, handleSave} from "../../../../../../modules/steps/notes/actions";

const mapStateToProps = (state, props) => {
    return{
        note1: state.notes.notes_output.note1,
        note2: state.notes.notes_output.note2,
        is_primary_flyout_open: state.notes.notes_output.is_primary_flyout_open,
        is_secondary_flyout_open: state.notes.notes_output.is_secondary_flyout_open,
        is_primary_step_set: state.notes.notes_output.is_primary_step_set,
        is_secondary_step_set: state.notes.notes_output.is_secondary_step_set,
    }
};


export const NotesContainer = connect( mapStateToProps, { getUserNotes, closeNotesFlyout, handleSave  });