import { connect } from 'react-redux';
import {selectTable} from "../../../../../../modules/datasets/actions";

const mapStateToProps = ({ cases: { data_sets, fetch_steps_succeeded }, datasets: { selected_table_reference } }) => ({
    data_sets,
    fetch_steps_succeeded,
    selected_table_reference
});


export const TableContainer = connect(mapStateToProps, { selectTable });