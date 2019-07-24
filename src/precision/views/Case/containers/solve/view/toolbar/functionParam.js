import { connect } from 'react-redux';
// import { formValueChange, setFormValue } from '../modules/function-execution';


import { any, fromPairs, keys, pathOr } from "ramda";
import {formValueMultiChange, setSelectedFunctionParameters} from "../../../../../../modules/case/toolbar/actions";

const getPattern = (type) => {
    switch (type) {
        case 'int':
            return undefined; // '\-?\d+';
        case 'float':
            return undefined; // '\-?\d+(\.\d+)?';
        default:
            return undefined;
    }
};
const mapStateToProps = (state, props) => {
    const function_parameter = state.functions.parameters.list.filter(parameter => parameter.name === props.parameter_name).shift();
    const type = (function_parameter.type === 'int' || function_parameter.type === 'float') ? 'text' : function_parameter.type;
    const step = function_parameter.type === 'float' ? 0.000001 : function_parameter.type === 'int' ? 1 : undefined;
    const pattern = getPattern(function_parameter.type);
    const parameters = state.functions.parameters;
    const selections = state.functions.selections;
    const selected_hrefs = keys(state.functions.selections);
    const isDataSetSelected = (dataSetHref) => any(selected_href => dataSetHref.indexOf(selected_href) >= 0, selected_hrefs);
    const data_sets = state.datasets.list.items;
    const selected_data_sets = data_sets
        .map((data_set, index) => ({
            name: data_set.name || `Table_${index}`,
            path: data_set.ref,
            has_selections: selected_hrefs.some(reference => reference === data_set.ref)
        }));
    const data_set_reference = selected_data_sets
        .filter(ds => isDataSetSelected(pathOr('', ['path'], ds)))
        .filter(ds => selections[ds.path].length !== 0)
        .map(ds => ds);
    let data_set_references = fromPairs(data_set_reference
        .map(ds => [ds.path, {
            name: ds.name,
            path: ds.path,
            uri: ds.path
        }]));
    return {
        ...function_parameter,
        type,
        pattern,
        value: state.functions.parameters[props.parameter_name],
        step,
        note: function_parameter.note,
        parameters: parameters,
        selections,
        dataSets: data_set_references,
        data_set: data_set_reference
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    onChange: value => dispatch(setSelectedFunctionParameters(props.parameter_name, value.value)),
    onMultiChange: value => dispatch(formValueMultiChange(props.parameter_name, value))
});
export const FunctionParamContainer = connect(mapStateToProps, mapDispatchToProps);
