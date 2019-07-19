import {connect} from "react-redux";
import {createDatasetModal, getUploadLink} from "../../../../../../../modules/datasets/actions";

const mapStateToProps = (state) => ({
    solve_id: state.cases.info.solve_id && state.cases.info.solve_id,
    upload_dataset: state.datasets.upload_dataset
});

export const CreateDatasetModalContainer = connect(mapStateToProps, { getUploadLink, createDatasetModal });