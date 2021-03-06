import React , { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './Table.scss';
import {DataTableContainer} from "../../../../containers/solve/view/dataset/dataTable";
import TableSkeleton from "../../../../../../components/Skeletons/TableSkeleton";

export class DataTable extends Component {

    state = {
        csvData: [],
        headerRow: [],
        selectedHeaders: [],
        table_loading:false
    };



    componentDidMount() {
        this.prepareCsvData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.fetch_steps_succeeded && this.props.fetch_steps_succeeded !== prevProps.fetch_steps_succeeded) {
            this.prepareCsvData()
        }
        if ( (this.props.csv !== "" && this.props.csv !== prevProps.csv)) {
            this.prepareCsvData()
        }
        if (this.props.data_download_succeeded  && this.props.data_download_succeeded !== prevProps.data_download_succeeded) {
            if (!(Object.keys(this.props.data_by_uri).length === 0 && this.props.data_by_uri[this.props.csv])) {
                this.getCsvDataFromStore();
            }

        }
    }

    getCsvDataFromStore = () => {
        let csv_data = this.props.data_by_uri[this.props.csv];
        this.setState({
            csvData: csv_data.rows,
            headerRow: csv_data.header
        });
        this.setState({table_loading: false});
    }

    prepareCsvData = () => {
        this.setState({table_loading:true});
        if(Object.keys(this.props.data_by_uri).length === 0){
            this.props.fetchCsvData(this.props.csv)
        }else{
            if(this.props.data_by_uri[this.props.csv] !== undefined){
                this.getCsvDataFromStore();
            }else{
                this.props.fetchCsvData(this.props.csv);
            }
        }
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
        const {is_steps_open} = this.props;
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
            <div className={is_steps_open? "data-table data-table--1" : "data-table data-table--2"}>
               {!this.state.table_loading ?
                   <ReactTable
                    data={rows}
                    columns={headerRow}
                    getTheadThProps={this.getTheadThProps}
                    showPagination= {false}
                    defaultPageSize = {200}
                /> :
                   <TableSkeleton is_steps_open={is_steps_open}/>
               }
            </div>
        )
    }
}


export default DataTableContainer(DataTable)
