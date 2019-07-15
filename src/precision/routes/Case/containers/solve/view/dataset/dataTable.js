import { connect } from 'react-redux';
import { path } from 'ramda';


const getHeaders = (headers) => ['', ...headers];
const getRow = (row, i) => [(i + 1).toString(), ...row];
const mapStateToProps = (state, props) => {
    const matched_data_set =
        state.cases.fetch_steps_succeeded &&
        state.datasets.list.items.filter(data_set => data_set.ref === props.dataset_reference).shift();
    const csv = path(['ref'], matched_data_set);
    return {
        csv,
    };
};

export const DataTableContainer = connect(mapStateToProps, {getHeaders, getRow});