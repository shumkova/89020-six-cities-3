import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import OfferCard from "./offer-card";

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(OfferCard);
