import {getAuthInfo, getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import Header from "./header";

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthInfo(state),
});

export default connect(mapStateToProps)(Header);
