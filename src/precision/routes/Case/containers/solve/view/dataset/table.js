import { connect } from 'react-redux';
import {selectTable} from "../../../../../../modules/datasets/actions";

const mapStateToProps = ({ cases: { fetch_steps_succeeded }, functions: {selections}, datasets: {fetch_dataset_succeeded, list, selected_table_reference } }) => ({
    data_sets: list.items,
    fetch_steps_succeeded,
    selected_table_reference:
        selected_table_reference !== ""
        ? selected_table_reference
        : fetch_dataset_succeeded && list.items[0].ref,
    selections,
});


export const TableContainer = connect(mapStateToProps, { selectTable });