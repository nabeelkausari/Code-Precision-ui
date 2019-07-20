import React, {Component} from 'react';

import Checkbox from '../../../../../components/Checkbox/Checkbox'
import './TableFlyout.scss';

class TablesFlyout extends Component {
    state = {
        current_dataset: '',
        columns: [],
        selectedColumns: []
    };

    componentDidMount() {
        this.setState({
            current_dataset: this.props.data_sets[0].ref,
            columns: this.props.data_sets[0].columns
        })
    }

    handleDisplayColumns = (dataset) => {
        this.setState({
            current_dataset: dataset.ref,
            columns: dataset.columns
        })
    };

    handleAvailableColumnSelect = (column) => {

        if(this.props.selections[this.state.current_dataset] !== undefined){
            this.props.setColumnSelections(this.state.current_dataset, column);
        }else{
            if(Object.keys(this.props.selections).length < 2){
                this.props.setColumnSelections(this.state.current_dataset, column);
            }else{
                alert("you have already selected two tables")
            }
        }

    };

    render() {
        const {current_dataset, columns} = this.state;
        const selected = this.props.selections[current_dataset] || [];
        return (
            <div className="table-flyout-container">
                <div className="table-box">
                    {this.props.data_sets.length > 0 && this.props.data_sets.map((ds, i) =>
                        <div key={i} className="table-box__title"
                             style={current_dataset === ds.ref ? {color: '#52a7dc'} : {}}
                             onClick={() => this.handleDisplayColumns(ds)}
                        >{ds.name}
                        </div>
                    )}
                </div>
                <div className="columns-box">
                    {(selected.length !== 0)?
                        <h6 className="columns-box__selected-text">{selected.length}&nbsp;Selected</h6>
                        :
                        <h6 className="columns-box__selected-text">&nbsp;</h6>
                    }
                    {columns.length > 0 && columns.map((column,i) =>
                        <Checkbox checked={selected.indexOf(column) >= 0}  onChange={() => this.handleAvailableColumnSelect(column)} label={column.key} key={i}/>
                    )}
                </div>
            </div>
        );
    }
}

export default TablesFlyout;

{/*<div className={this.state.selected ? "columns-box__title--selected": "columns-box__title"} key={i}>*/}
{/*<input className="u-margin-right-small" type="checkbox" checked={selected.indexOf(column) >= 0} onChange={() => this.handleAvailableColumnSelect(column)}/>*/}
{/*{column.key}*/}
{/*</div>*/}