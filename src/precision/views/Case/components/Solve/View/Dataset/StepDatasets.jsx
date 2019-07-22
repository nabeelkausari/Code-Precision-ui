import React , { Component } from 'react';
import {StepDatasetContainer} from "../../../../containers/solve/view/dataset/stepDataset";
import {Table} from "react-bootstrap";


class StepDataset extends Component{
    componentDidMount() {
        this.props.fetchStepDetailsCsv(this.props.csv)
    }

    render() {
        const { csv_info } = this.props;
        return(
            <div>
                {this.props.csv_info &&
                <Table striped bordered variant={"dark"}>
                    <thead>
                    <tr>
                        {csv_info.csvData.map((head, i) =>
                            <th key={i}>{head}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {csv_info.headerRow.map(row =>
                            row.map((row_name, i) => <td key={i}>{row_name}</td>)
                        )}
                    </tr>
                    </tbody>
                </Table>
                }
            </div>
        )
    }
}

export default StepDatasetContainer(StepDataset)