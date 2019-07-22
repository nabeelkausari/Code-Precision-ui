import React, { Component } from 'react';
import {DatasetContainer} from "../../../../containers/solve/view/dataset/dataset";
import Table from "./Table";
import TableSkeleton from '../../../../../../components/Skeletons/TableSkeleton'

class Dataset extends Component {
    render() {
        const {dataset_loading, fetch_dataset_succeeded, is_steps_open} = this.props
        return (
            <div>
                {
                    <Table is_steps_open={is_steps_open}/>
                }
            </div>
        );
    };
};


export default DatasetContainer(Dataset)