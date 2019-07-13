import React, { Component } from 'react';
import {DatasetContainer} from "../../../../containers/solve/view/dataset/dataset";
import Table from "./Table";

class Dataset extends Component {
    render() {
        return (
            <div>
                <Table />
            </div>
        );
    };
};


export default DatasetContainer(Dataset)