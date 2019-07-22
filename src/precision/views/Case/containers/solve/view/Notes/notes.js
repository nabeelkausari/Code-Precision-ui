import { connect} from 'react-redux'
import {closeNotesFlyout, handleSave} from "../../../../../../modules/steps/notes/actions";

const mapStateToProps = ({notes: { notes_info, fetch_notes_succeeded }}) => ({
    notes_details: notes_info.noteDetails,
    fetch_notes_succeeded
});


export const NotesContainer = connect( mapStateToProps, { closeNotesFlyout, handleSave  });