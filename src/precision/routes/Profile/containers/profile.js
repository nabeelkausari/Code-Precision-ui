import {connect} from "react-redux";
import {getprofile} from "../../../modules/profile/actions";


const mapStateToProps = (state, props) =>{
    return {
        fetch_profile_succeeded: state.profile.fetch_profile_succeeded
    }
};

export default connect(mapStateToProps,{getprofile})