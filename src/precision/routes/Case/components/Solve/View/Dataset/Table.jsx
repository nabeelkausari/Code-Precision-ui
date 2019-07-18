import React, {Component} from 'react'
import {TableContainer} from "../../../../containers/solve/view/dataset/table";
import './Table.scss';
import DataTable from "./DataTable";
import CreateDataset from './CreateDataset/CreateDataset';

class Table extends Component {

    state = {
        handleCreateDataset: null
    };

    handleSelectTable = (href) => {
        this.props.selectTable(href);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.fetch_dataset_succeeded && this.props.fetch_dataset_succeeded !== prevProps.fetch_dataset_succeeded) {
            this.props.selectTable(this.props.data_sets[0].ref)
        }
    }


    handleCreateDataset = () => {
        this.setState({
            handleCreateDataset: true
        })
    };

    render() {
        const {data_sets, fetch_steps_succeeded, dataset_loading, selected_table_reference} = this.props;
        const {handleCreateDataset} = this.state;
        return (
            <div>
                {handleCreateDataset
                    ? <CreateDataset />
                    : <div>
                        <div className="table-tabs__container">
                            {fetch_steps_succeeded && data_sets.map((ds, i) => (
                                <div key={i}
                                     className={ds.ref === selected_table_reference ? "table-tabs__name table-tabs__name-active" : "table-tabs__name"}
                                     onClick={() => this.handleSelectTable(ds.ref)}>
                                    {ds.name}
                                </div>
                            ))}
                            <button onClick={this.handleCreateDataset}>Add Dataset</button>
                        </div>
                        {selected_table_reference !== "" &&
                        <DataTable dataset_reference={selected_table_reference} selections={this.props.selections}/>}
                    </div>}
            </div>)
    }
}

export default TableContainer(Table)