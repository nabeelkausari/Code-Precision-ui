import { connect } from 'react-redux';

const mapStateToProps = ({ cases: { info,steps,  fetch_case_succeeded, fetch_steps_succeeded} }) => ({
    info,
    steps,
    fetch_case_succeeded,
    fetch_steps_succeeded,
});


export const DatasetContainer = connect(mapStateToProps, {});