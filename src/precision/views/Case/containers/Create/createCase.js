import {connect} from "react-redux";

import {
    createBusinessProblem, createCase,
    getCaseCategories,
    getRecommendations,
    selectRecommendation
} from "../../../../modules/case/actions";

const mapStateToProps = (state,props) =>{
    return{
        case_create: state.cases.create,
        recommendations: state.cases.recommendations,
        case_categories: state.cases.categories.list

    }
}

export default connect(mapStateToProps,{createBusinessProblem, getRecommendations, selectRecommendation, getCaseCategories, createCase})