import { connect } from 'react-redux';
import { path } from 'ramda';

const mapStateToProps = (state, props) => {
    const matched_data_set =
        state.cases.fetch_steps_succeeded &&
        state.cases.data_sets.filter(data_set => data_set._links.self.href === props.dataset_reference).shift();
    const csv = path(['_links', 'ui_data', 'href'], matched_data_set);
    return {
        csv,
    };
};

export const DataTableContainer = connect(mapStateToProps, {});