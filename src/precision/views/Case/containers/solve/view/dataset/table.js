import { connect } from 'react-redux';
import {selectTable} from "../../../../../../modules/datasets/actions";
import {getScenarioDetails} from "../../../../../../modules/case/actions";

const mapStateToProps = ({ cases: { fetch_steps_succeeded }, functions: {selections}, datasets: {fetch_dataset_succeeded, list, selected_table_reference,dataset_created_succeeded } }) => ({
    data_sets: list.items,
    fetch_steps_succeeded,
    selected_table_reference:
        selected_table_reference !== ""
        ? selected_table_reference
        : fetch_dataset_succeeded && list.items.length >0 &&  list.items[0].ref,
    selections,
    dataset_created_succeeded,
    fetch_dataset_succeeded
});


export const TableContainer = connect(mapStateToProps, { selectTable, getScenarioDetails });