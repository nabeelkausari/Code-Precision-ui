import { connect } from 'react-redux';
import {setCurrentStep, undo, redo, getSteps} from '../../../../modules/case/actions'

function mapStateToProps(state, ownProps) {

    // if()
    const steps = state.cases.steps;
    if (!steps) return{};

    const last_step = steps[steps.length - 1];
    const undo_available = !!last_step && !!last_step._links.undo
    const undo_requested = state.cases.undo_requested;
    const redo_available = !!last_step && !!last_step._links.redo
    const redo_requested = state.cases.redo_requested;
    return {
        steps,
        last_step ,
        undo_available,
        undo_requested,
        redo_available,
        redo_requested,
        function_execution_succeeded: state.functions.function_execution_succeeded
    }
}

const mapDispatchToProps = (dispatch, { step_reference }) => ({
    onShowResultClick: (payload) => dispatch(setCurrentStep(payload)),
    onUndoClick: (link) => dispatch(undo(link)),
    onRedoClick: (link) => dispatch(redo(link)),
    getSteps: () => dispatch(getSteps())
});


export default connect( mapStateToProps, mapDispatchToProps)