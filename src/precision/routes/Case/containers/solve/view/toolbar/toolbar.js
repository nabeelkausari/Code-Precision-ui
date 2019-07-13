import { connect } from 'react-redux';
import {getFunctionDescription, suggestFunctions, deleteColumnSelection, setColumnSelections} from "../../../../../../modules/case/toolbar/actions";

const mapStateToProps = (state) => {
    const { cases: { data_sets } , functions: { categories, list:{items}, suggestions, description, selections }, datasets: { list }} = state;
    const is_fetched = state.functions.fetch_functions_succeeded && state.functions.fetch_function_categories_succeeded;
    return {
        dataset_list: list,
        suggestions,
        is_fetched,
        description,
        categories: is_fetched && items && categories.items
            .filter(category => category._links.parent === undefined)
            .map(cat => ({
                ...cat,
                sub_categories: categories.items
                    .filter(c => c._links.parent && c._links.parent.href === cat._links.self.href)
                    .map(subcat => ({
                        ...subcat,
                        functions_list: items && items
                            .filter((f) => f._links.self)
                            .filter(fn => subcat.functions.indexOf(fn._links.self.href) !== -1)

                    }))
            }))

    }
};


export const ToolbarContainer = connect(mapStateToProps, {suggestFunctions,getFunctionDescription, setColumnSelections, deleteColumnSelection} );