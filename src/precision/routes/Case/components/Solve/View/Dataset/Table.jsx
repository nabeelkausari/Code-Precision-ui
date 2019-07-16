import React, { Component } from 'react'
import {TableContainer} from "../../../../containers/solve/view/dataset/table";
import './Table.scss';
import DataTable from "./DataTable";

class Table extends Component{

    handleSelectTable = (href) => {
        this.props.selectTable(href);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.fetch_steps_succeeded && this.props.fetch_steps_succeeded !== prevProps.fetch_steps_succeeded){
            this.props.selectTable(this.props.data_sets[0].ref)
        }
    }

    render() {
        const { data_sets, fetch_steps_succeeded, selectTable, selected_table_reference } =this.props;
        return(
            <div>
                <div className="table">
                    {fetch_steps_succeeded && data_sets.map((ds, i) => (
                        <div className={ds.ref === selected_table_reference ? "table__name table__name-active": "table__name" } onClick={() => this.handleSelectTable(ds.ref)}>
                            {ds.name}
                        </div>
                    ))}
                </div>
                {selected_table_reference !== "" && <DataTable dataset_reference={selected_table_reference} selections={this.props.selections}/>}
            </div>

        )
    }
}

export default TableContainer(Table)