import { connect } from 'react-redux';
import { setCurrentStep } from '../../../../modules/case/actions'

function mapStateToProps(state, ownProps) {
    return {steps: state.cases.steps}
}

const mapDispatchToProps = (dispatch, { step_reference }) => ({
    onShowResultClick: (payload) => dispatch(setCurrentStep(payload)),

});


export default connect( mapStateToProps, mapDispatchToProps)