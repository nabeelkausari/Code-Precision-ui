import { connect } from 'react-redux';
import {setCurrentStep, undo, redo, getSteps, reset} from '../../../../modules/case/actions'

function mapStateToProps(state, ownProps) {

    // if()
    const steps = state.cases.steps;
    if (!steps) return{};

    const last_step = steps[steps.length - 1];
    const undo_available = !!last_step && !!last_step._links.undo;
    const redo_available = !!last_step && !!last_step._links.redo;
    const redo_requested = state.cases.redo_requested;
    const can_reset = !!state.cases.info._links.reset || undefined;
    return {
        steps,
        last_step ,
        undo_available,
        redo_available,
        redo_requested,
        function_execution_succeeded: state.functions.function_execution_succeeded,
        can_reset
    }
}

const mapDispatchToProps = (dispatch, { step_reference }) => ({
    onShowResultClick: (payload) => dispatch(setCurrentStep(payload)),
    onUndoClick: (link) => dispatch(undo(link)),
    onRedoClick: (link) => dispatch(redo(link)),
    onResetClick: () => dispatch(reset()),
    getSteps: () => dispatch(getSteps())
});


export default connect( mapStateToProps, mapDispatchToProps)