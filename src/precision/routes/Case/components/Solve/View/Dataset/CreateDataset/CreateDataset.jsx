import React , {Component} from 'react';
import {CreateDatasetContainer} from "../../../../../containers/solve/view/dataset/createDataset/createDataset";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CreateDataSetModal from "./CreateDataSetModal";

class CreateDataset extends Component{
    render() {
        return(
            <Tabs defaultActiveKey="upload-dataset" id="uncontrolled-tab-example">
                <Tab eventKey="upload-dataset" title="Upload Dataset">
                    <CreateDataSetModal />
                </Tab>
                <Tab eventKey="connect-to-database" title="Connect To Database">

                </Tab>
                <Tab eventKey="upload-preload-dataset" title="Upload Preload Dataset">

                </Tab>
            </Tabs>
        )
    }
}

export default CreateDatasetContainer(CreateDataset);
