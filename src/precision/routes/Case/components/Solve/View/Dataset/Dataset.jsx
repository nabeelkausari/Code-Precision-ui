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
                    fetch_dataset_succeeded && !dataset_loading?
                        <Table />
                        :
                        <TableSkeleton/>
                }
            </div>
        );
    };
};


export default DatasetContainer(Dataset)