import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
     steps: state.cases.steps
 }
};

export const StepsContainer = connect( mapStateToProps,  null);