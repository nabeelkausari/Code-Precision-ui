import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
    const {cases:{current_case}} = state;
    const scenarios = current_case.info.scenarios.map(s => s);
    return{
        current_case: current_case.info,
        profile: state.profile.info,
        scenarios
    }
};

export const ExtractContainer = connect(mapStateToProps, null);