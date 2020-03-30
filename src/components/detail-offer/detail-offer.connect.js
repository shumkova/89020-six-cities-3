import {getActiveOffer} from "../../reducer/app/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import DetailOffer from "./detail-offer";

const mapStateToProps = (state) => ({
  offer: getActiveOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(DetailOffer);
