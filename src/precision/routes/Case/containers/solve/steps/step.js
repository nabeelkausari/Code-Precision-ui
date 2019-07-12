import {connect} from 'react-redux'
import {getUserNotes} from "../../../../../modules/steps/notes/actions";


const mapStateToProps = () => ({

});

export const StepContainer = connect(mapStateToProps, { getUserNotes });