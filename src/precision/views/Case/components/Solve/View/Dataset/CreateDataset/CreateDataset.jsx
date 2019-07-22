import React , {Component} from 'react';
import {CreateDatasetContainer} from "../../../../../containers/solve/view/dataset/createDataset/createDataset";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CreateDataSetModal from "./CreateDataSetModal";
import ConnectToExternalDatabase from "./ConnectToExternalDatatbase";
import CreatePreloadDatasetModal from "./CreatePreloadDatasetModal";
import './CreateDataset.scss'
class CreateDataset extends Component{

    componentDidMount() {
        this.props.fetchSqlForm();
        this.props.fetchPreloadDatasets()
    }

    render() {
        return(
            <Tabs defaultActiveKey="upload-dataset" id="uncontrolled-tab-example">
                <Tab eventKey="upload-dataset" title="Upload Dataset" >
                     <CreateDataSetModal />
                </Tab>
                <Tab eventKey="connect-to-database" title="Connect To Database" >
                    <ConnectToExternalDatabase />
                </Tab>
                <Tab eventKey="upload-preload-dataset" title="Upload Preload Dataset" >
                    <CreatePreloadDatasetModal />
                </Tab>
            </Tabs>
        )
    }
}

export default CreateDatasetContainer(CreateDataset);
