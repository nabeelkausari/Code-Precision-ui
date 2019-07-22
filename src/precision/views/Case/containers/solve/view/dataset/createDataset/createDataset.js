import {connect} from "react-redux";
import {fetchPreloadDatasets, fetchSqlForm, getUploadLink} from "../../../../../../../modules/datasets/actions";

const mapStateToProps = (state) => ({
    upload_dataset: state.datasets.upload_dataset,
    dataset_created_succeeded: state.datasets.dataset_created_succeeded
});

export const CreateDatasetContainer = connect(mapStateToProps, { getUploadLink,fetchSqlForm, fetchPreloadDatasets });