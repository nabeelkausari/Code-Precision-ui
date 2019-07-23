import { connect } from "react-redux";
import {connectToExternalDatabase, fetchSqlForm} from "../../../../../../../modules/datasets/actions";

const mapStateToProps = (state) => {
    return {
        sql_form: state.datasets.sql_parameters.list
    }
};

export const ConnectToExternalDataBase = connect(mapStateToProps, { fetchSqlForm, connectToExternalDatabase });