import { connect } from 'react-redux';

function mapStateToProps(state, ownProps) {
    return {steps: state.case.steps}
}

export default connect( mapStateToProps,  null)