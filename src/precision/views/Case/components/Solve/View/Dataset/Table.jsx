import React, {Component} from 'react'
import {TableContainer} from "../../../../containers/solve/view/dataset/table";
import './Table.scss';
import DataTable from "./DataTable";
import CreateDataset from './CreateDataset/CreateDataset';
import {add_button_icon} from "../../../../../../images/index"
import Tooltip from "../../../../../../components/Tooltip/Tooltip"

class Table extends Component {

    state = {
        handleCreateDataset: null
    };

    handleSelectTable = (href) => {
        this.props.selectTable(href);
        this.closeCreateDataset()
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.fetch_dataset_succeeded && this.props.fetch_dataset_succeeded !== prevProps.fetch_dataset_succeeded) {
            this.props.selectTable(this.props.data_sets[0].ref)
        }
        if(this.props.dataset_created_succeeded && this.props.dataset_created_succeeded !== prevProps.dataset_created_succeeded){
            this.props.getScenarioDetails();
            this.closeCreateDataset()
        }
    }

    handleCreateDataset = () => {
        this.setState({
            handleCreateDataset: true
        })
    };

    closeCreateDataset = () => {
        this.setState({
            handleCreateDataset: false
        })
    };

    render() {
        const {data_sets, fetch_steps_succeeded,selected_table_reference, is_steps_open} = this.props;
        const {handleCreateDataset} = this.state;
        return (
            <div>
                 <div>
                        <div className="table-tabs__container">
                            {fetch_steps_succeeded && data_sets.map((ds, i) => (
                                <div key={i}
                                     className={ds.ref === selected_table_reference ? "table-tabs__name table-tabs__name--active" : "table-tabs__name"}
                                     onClick={() => this.handleSelectTable(ds.ref)}>
                                    {ds.name}
                                    <span className="table-tabs__selected-col-notifier"></span>
                                </div>
                            ))}
                            <Tooltip placement="right" text="Add Dataset">
                                <div className="table-tabs__btn-container" onClick={this.handleCreateDataset}>
                                        <img src={add_button_icon} alt="add button" className="table-tabs__add-btn"/>
                                </div>
                            </Tooltip>

                        </div>
                     {handleCreateDataset
                         ? <CreateDataset closeCreateDataset={this.closeCreateDataset}/>
                         : selected_table_reference !== "" &&
                        <DataTable dataset_reference={selected_table_reference} selections={this.props.selections} is_steps_open={is_steps_open}/>
                     }
                    </div>
            </div>)
    }
}

export default TableContainer(Table)