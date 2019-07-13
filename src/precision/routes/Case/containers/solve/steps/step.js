import {connect} from 'react-redux'
import {getUserNotes, resetNotesFlyout} from "../../../../../modules/steps/notes/actions";
import {resetResultsFlyouts} from "../../../../../modules/case/actions"


const mapStateToProps = () => ({

});

export const StepContainer = connect(mapStateToProps, { getUserNotes, resetNotesFlyout, resetResultsFlyouts });