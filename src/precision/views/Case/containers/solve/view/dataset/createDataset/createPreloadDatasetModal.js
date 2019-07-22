import {connect} from "react-redux";
import {handleSubmitPreloadModal} from "../../../../../../../modules/datasets/actions";

const mapStateToProps = (state) => {
  console.log(state.datasets.preload_dataset_succeeded)
  return{
    data_sets:  state.datasets.preload_datasets,
    data_set_succeeded: state.datasets.preload_dataset_succeeded
  }
};

export const CreatePloadDataset = connect(mapStateToProps, {handleSubmitPreloadModal});