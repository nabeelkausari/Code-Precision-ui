import { connect } from 'react-redux';

function mapStateToProps(state, ownProps) {
    return {steps: state.cases.steps}
}

export default connect( mapStateToProps,  null)