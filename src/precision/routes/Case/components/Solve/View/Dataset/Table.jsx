import React, { Component } from 'react'
import {TableContainer} from "../../../../containers/solve/view/dataset/table";
import './Table.scss';
import DataTable from "./DataTable";

class Table extends Component{

    handleSelectTable = (href) => {
        this.props.selectTable(href);
    };

    render() {
        const { data_sets, fetch_steps_succeeded, selectTable, selected_table_reference } =this.props;
        return(
            <div>
                <div className="table">
                    {fetch_steps_succeeded && data_sets.map((ds, i) => (
                        <div className="table__name" onClick={() => this.handleSelectTable(ds.ref)}>
                            {ds.name}
                        </div>
                    ))}
                </div>
                {selected_table_reference !== ""
                    ? <DataTable dataset_reference={selected_table_reference} selections={this.props.selections}/>
                    : data_sets.length >0  && <DataTable dataset_reference={data_sets[0].ref} selections={this.props.selections}/>}
            </div>

        )
    }
}

export default TableContainer(Table)