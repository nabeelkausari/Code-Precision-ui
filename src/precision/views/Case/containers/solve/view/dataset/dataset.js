import { connect } from 'react-redux';

const mapStateToProps = ({ cases: { info,steps,  fetch_case_succeeded, fetch_steps_succeeded}, datasets : {dataset_loading, fetch_dataset_succeeded} }) => ({
    info,
    steps,
    fetch_case_succeeded,
    fetch_steps_succeeded,
    dataset_loading,
    fetch_dataset_succeeded
});


export const DatasetContainer = connect(mapStateToProps, {});