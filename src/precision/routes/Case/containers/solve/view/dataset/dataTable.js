import { connect } from 'react-redux';
import { path } from 'ramda';
import {setAllColumnSelections, setColumnSelections} from "../../../../../../modules/case/toolbar/actions";

const mapStateToProps = (state, props) => {
    const matched_data_set =
        state.cases.fetch_steps_succeeded &&
        state.datasets.list.items.filter(data_set => data_set.ref === props.dataset_reference).shift();
    const csv = path(['uiDataLink', 'href'], matched_data_set);
    return {
        csv,
        fetch_steps_succeeded: state.cases.fetch_steps_succeeded,
        column_selections: state.functions.selections,
        dataset_loading: state.datasets.dataset_loading
    };
};

export const DataTableContainer = connect(mapStateToProps, { setColumnSelections, setAllColumnSelections });