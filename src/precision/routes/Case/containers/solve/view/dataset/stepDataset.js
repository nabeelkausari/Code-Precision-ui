import { connect} from "react-redux";
import {fetchStepDetailsCsv} from "../../../../../../modules/datasets/actions";

const mapStateToProps = (state) => ({
    csv_info: state.datasets.csv_info
});

export const StepDatasetContainer = connect( mapStateToProps, {fetchStepDetailsCsv});