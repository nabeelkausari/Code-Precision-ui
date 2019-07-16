import { connect } from 'react-redux';
import {setCurrentStep, undo, redo} from '../../../../modules/case/actions'

const mapStateToProps = (state, ownProps) => {

    const { steps } = state.cases;
    if (!steps) return {};

    const last_step = steps[steps.length - 1];
    const undo_available = !!last_step && !!last_step._links.undo
    const redo_available = !!last_step && !!last_step._links.redo
    const redo_requested = state.cases.redo_requested;
    return {
        steps,
        last_step ,
        undo_available,
        redo_available,
        redo_requested
    }
}

export default connect(mapStateToProps, {
    setCurrentStep,
    undo, redo
})
