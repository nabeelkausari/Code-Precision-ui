import {connect} from "react-redux";
const mapStateToProps = (state, props) => {
    const {cases:{current_case}} = state;
    return{
        current_case: current_case.info,
        profile: state.profile.info
    }
}
export default connect(mapStateToProps,{})