import {getFavorites} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import Favorites from "./favorites";

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(Favorites);
