import { connect} from "react-redux";
import {fetchConsole} from "../../../../../../modules/console/actions";
import {getScenarioDetails} from "../../../../../../modules/case/actions";

const mapStateToProps = (state) => ({
    fetch_case_succeeded: state.cases.fetch_case_succeeded,
    console_url: state.console.console_url
});

export const ConsoleContainer = connect(mapStateToProps, { fetchConsole, getScenarioDetails });