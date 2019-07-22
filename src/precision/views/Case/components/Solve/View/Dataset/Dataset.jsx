import React, { Component } from 'react';
import {DatasetContainer} from "../../../../containers/solve/view/dataset/dataset";
import Table from "./Table";
import TableSkeleton from '../../../../../../components/Skeletons/TableSkeleton'

class Dataset extends Component {
    render() {
        const {dataset_loading, fetch_dataset_succeeded} = this.props
        return (
            <div>
                {
                    <Table />
                }
            </div>
        );
    };
};


export default DatasetContainer(Dataset)