import React, {Component, Fragment} from 'react'
import get from 'lodash/get'
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

    componentDidMount() {
        if(this.props.dataset_created_succeeded && this.props.data_sets.length === 0) {
            this.handleCreateDataset()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.fetch_dataset_succeeded && this.props.fetch_dataset_succeeded !== prevProps.fetch_dataset_succeeded) {
            this.props.selectTable(get(this.props, 'data_sets[0].ref'));
            if(this.props.data_sets.length === 0) {
                this.handleCreateDataset()
            }
        }
        if(this.props.dataset_created_succeeded && this.props.dataset_created_succeeded !== prevProps.dataset_created_succeeded){
            this.props.getScenarioDetails();
            this.closeCreateDataset();
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

    renderSelectionsNotifier = (ref) => {
        if(!(Object.keys(this.props.selections).length === 0 || this.props.selections === undefined)){
            return this.props.selections[ref] && this.props.selections[ref].length
        }
    }

    render() {
        const {data_sets, fetch_steps_succeeded,selected_table_reference, is_steps_open} = this.props;
        const {handleCreateDataset} = this.state;
        return (
            <div>
                <div>
                    <div className="table-tabs__container">
                        {fetch_steps_succeeded && data_sets.map((ds, i) => (
                            <div key={i}
                                 className={ds.ref === selected_table_reference && !handleCreateDataset ? "table-tabs__name table-tabs__name--active" : "table-tabs__name"}
                                 onClick={() => this.handleSelectTable(ds.ref)}>
                                {ds.name}
                                <span className="table-tabs__selected-col-notifier">{this.renderSelectionsNotifier(ds.ref)}</span>
                            </div>
                        ))}
                        {
                            handleCreateDataset &&
                           <Fragment>
                               <div className="table-tabs__name table-tabs__name--active">
                                   New Dataset
                               </div>
                               {data_sets && data_sets.length !== 0 && <Tooltip placement="right" text="Cancel">
                                   <div className="table-tabs__btn-container" onClick={this.closeCreateDataset}>
                                       <img src={add_button_icon} alt="add button" className="table-tabs__cancel-btn"/>
                                   </div>
                               </Tooltip>}
                           </Fragment>
                        }

                       {! handleCreateDataset &&
                            <Tooltip placement="right" text="Add Dataset">
                                <div className="table-tabs__btn-container" onClick={this.handleCreateDataset}>
                                    <img src={add_button_icon} alt="add button" className="table-tabs__add-btn"/>
                                </div>
                            </Tooltip>
                       }

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