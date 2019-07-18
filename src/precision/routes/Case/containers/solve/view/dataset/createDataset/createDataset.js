import {connect} from "react-redux";
import {fetchSqlForm, getUploadLink} from "../../../../../../../modules/datasets/actions";

const mapStateToProps = (state) => ({
    upload_dataset: state.datasets.upload_dataset
});

export const CreateDatasetContainer = connect(mapStateToProps, { getUploadLink,fetchSqlForm });