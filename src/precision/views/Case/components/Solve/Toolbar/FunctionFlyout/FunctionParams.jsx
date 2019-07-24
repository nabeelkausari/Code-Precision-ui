import * as React from 'react';
import { Component } from 'react';
import {  FormControl, FormGroup } from 'react-bootstrap';
import ReactSelect from 'react-select';
import {FunctionParamContainer} from "../../../../containers/solve/view/toolbar/functionParam";

class FunctionParams extends Component {
    state = {
        name: this.props.data_set && this.props.data_set[0].name,
        dataset: this.props.data_set &&this.props.data_set[0].path,
        columns: this.props.selections[this.props.data_set[0].path].length !== 0 ?
            this.props.selections[this.props.data_set[0].path].map(selections => selections.key) :
            null,
        selected_columns: []
    };



    onColumnChange = (columns_list) => {
        let selected_columns = columns_list !== null ? columns_list.map(column => column.value) : [];

        this.setState({
            selected_columns: selected_columns.map(selected => selected)
        });
        this.props.onMultiChange({ name: this.state.name, dataset: this.state.dataset, columns: selected_columns });
    };

    onDatasetChange = (dataset) => {
        this.setState({
            name: this.props.dataSets[dataset.value].name,
            dataset: dataset.value,
            columns: this.props.selections[this.props.dataSets[dataset.value].uri].map(headerSelection => headerSelection.key),
            selected_columns: []
        });
    };


    render() {
        const { type, label, multi_table, value, pattern, onChange, required, options, multi_select, readonly, note, data_set } = this.props;
        const datasetOptions = data_set && data_set.map(ds => ({value:ds.path,label:ds.name}));
        const datasetColumnOptions = this.state.columns && this.state.columns.map(column => ({value:column,label:column}));
        return (<div style={{"marginTop": "2rem"}}>{!!multi_table ?
            <FormGroup>
                <h4>{label}:</h4>
                {type === 'select' &&
                <ReactSelect
                    defaultValue={datasetOptions[0]}
                    options={datasetOptions}
                    onChange={this.onDatasetChange}
                    isMulti={false}
                />
                }

                <h4 style={{ marginTop: '15px' }}>Select Columns</h4>
                {type === 'select' &&
                <ReactSelect
                    options={datasetColumnOptions}
                    onChange={this.onColumnChange}
                    isMulti={multi_select && multi_table}
                />
                }
                {note &&
                <p>{note}</p>}
            </FormGroup> :
            <FormGroup>
                <h4>{label}:</h4>
                {type !== 'select' &&
                <FormControl
                    type={type}
                    label={label}
                    value={value}
                    pattern={pattern}
                    onChange={ev => onChange(ev.target.value)}
                    required={required}
                    readOnly={readonly}
                >

                </FormControl>}
                {type === 'select' &&
                   <ReactSelect
                    options={options}
                    onChange={onChange}
                    isMulti={multi_select || false}
                    />
                }
                {note &&
                <p>{note}</p>}
            </FormGroup>}
        </div>);
    }
}

export default FunctionParamContainer(FunctionParams);
