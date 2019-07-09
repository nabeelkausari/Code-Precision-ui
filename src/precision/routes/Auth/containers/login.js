import { connect } from 'react-redux';
import { login } from "../../../modules/auth/login/actions";

export default connect(({ auth }) => ({ ...auth }), { login })
