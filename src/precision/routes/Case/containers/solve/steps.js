import { connect } from 'react-redux';
import {setCurrentStep, undo, redo} from '../../../../modules/case/actions'

function mapStateToProps(state, ownProps) {

    // if()
    const steps = state.cases.steps
    if(steps)
    {
        const last_step = steps[steps.length -1];
        const undo_available = !!last_step && !!last_step._links.undo
        const redo_available = !!last_step && !!last_step._links.redo
        return {
            steps,
            last_step ,
            undo_available,
            redo_available
        }
    }
    else {
        return {steps}
    }


}

const mapDispatchToProps = (dispatch, { step_reference }) => ({
    onShowResultClick: (payload) => dispatch(setCurrentStep(payload)),
    onUndoClick: (link) => dispatch(undo(link)),
    onRedoClick: (link) => dispatch(redo(link))

});


export default connect( mapStateToProps, mapDispatchToProps)