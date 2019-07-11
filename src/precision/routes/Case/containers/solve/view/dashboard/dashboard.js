import { connect } from 'react-redux';

const mapStateToProps = ({ case: { info, steps,  fetch_case_succeeded, fetch_steps_succeeded } }) => ({
    info,
    steps,
    fetch_case_succeeded,
    fetch_steps_succeeded
});


export const DashboardContainer = connect(mapStateToProps, {});