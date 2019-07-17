import React , { Component } from 'react';
import Papa from 'papaparse';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './Table.scss';
import {DataTableContainer} from "../../../../containers/solve/view/dataset/dataTable";
import * as Loader from 'react-loader';

export class DataTable extends Component {

    state = {
        csvData: [],
        headerRow: [],
        selectedHeaders: []
    };



    componentDidMount() {
        this.fetchCsv();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.fetch_steps_succeeded && this.props.fetch_steps_succeeded !== prevProps.fetch_steps_succeeded){
            this.fetchCsv()
        }
        if(this.props.csv !== "" && this.props.csv !== prevProps.csv){
            this.fetchCsv()
        }

    }

    fetchCsv = () => {
        let csvData = [];
        let headerRow = [];
        Papa.parse(this.props.csv || "", {
            download: true,
            complete: (results) => {
                csvData=results.data;
                headerRow = csvData[0];
                csvData.splice(0, 1);
                let csv_rows = csvData.map((row, index) => {
                    let row_obj = {};
                    headerRow.map((header, i) => {
                        return row_obj[header] = row[i];
                    });
                    row_obj[" "] = index;
                    return row_obj
                });
                headerRow.unshift(" ");
                this.setState({
                    csvData: csv_rows.splice(0,csv_rows.length -1),
                    headerRow: headerRow.map((item, i) => ({ Header: item, accessor: item, index:i }))
            })
        }});
    };

    getTheadThProps = (state, rowInfo, column, instance) => {
        const selected_column = {
            index: column.index,
            key: column.Header,
        };
        return {
            onClick: (e) => {
                if(column.index > 0){
                    this.props.setColumnSelections(this.props.dataset_reference, selected_column )
                }else{
                    //select all
                    this.props.setAllColumnSelections(this.props.dataset_reference)
                }
            },
            style: {
                backgroundColor: "#EFF5FC"
            }
        };
    };


    render() {
        let rows = this.state.csvData;
        const selection_arr = this.props.column_selections[this.props.dataset_reference];
        let headerRow = [...this.state.headerRow];
            headerRow = headerRow.map(item => {
                const bgColorObject = selection_arr && selection_arr.some(column => column.key === item.Header) ? {backgroundColor:"rgba(0, 104, 224, .12)"} : {};
            return {
                ...item,
                style: bgColorObject,
                headerStyle: bgColorObject
            }
        });
        return(
            <Loader loaded={!this.props.dataset_loading}>
            <div className="data-table">
                <ReactTable
                    data={rows}
                    columns={headerRow}
                    getTheadThProps={this.getTheadThProps}
                    showPagination= {false}
                    defaultPageSize = {200}
                    resizable={false}
                />
            </div>
            </Loader>
        )
    }
}


export default DataTableContainer(DataTable)
