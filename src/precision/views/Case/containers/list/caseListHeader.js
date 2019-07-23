import {connect} from "react-redux";
import {logout} from "../../../../modules/auth/login/actions";

const mapStateToProps = (state, props) =>{
    return{
        profile: state.profile.info
    }
}

export default connect(mapStateToProps, {logout})