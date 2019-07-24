import {connect} from "react-redux";
import {getAllCases, getCaseCategories, getCaseDetails, getCases} from "../../../../modules/case/actions";

const mapStateToProps = (state, props) => {
    const {cases:{list,list:{fetch_cases_requested},all_cases:{items, fetch_all_cases_requested},categories}} = state;
    return {
        my_cases: list.items,
        all_cases: items,
        case_categories: ["All Categories", ...categories.list],
        is_fetching: fetch_cases_requested || fetch_all_cases_requested
    }
};

export default connect(mapStateToProps,{ getCases, getAllCases, getCaseCategories, getCaseDetails})