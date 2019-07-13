import React, {Component, Fragment} from 'react';
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
        const something = this.props.selections[current_dataset] || [];
        return (
            <div className="table-flyout-container">
                <div className="table-box">
                    {this.props.data_sets.length > 0 && this.props.data_sets.map(ds =>
                        <div className="table-box__title"
                             style={current_dataset === ds.ref ? {color: '#52a7dc'} : {}}
                             onClick={() => this.handleDisplayColumns(ds)}
                        >{ds.name}
                        </div>
                    )}
                </div>
                <div className="columns-box">
                    <h6>{something.length}Selected</h6>
                    {columns.length > 0 && columns.map(column =>
                        <div className={this.state.selected ? "columns-box__title--selected": "columns-box__title"}>
                            <input type="checkbox" checked={something.indexOf(column) >= 0} onChange={() => this.handleAvailableColumnSelect(column)}/>
                            {column.name}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default TablesFlyout;