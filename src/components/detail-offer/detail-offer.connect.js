import {getActiveOffer, getReviews, getNearbyOffers} from "../../reducer/app/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import DetailOffer from "./detail-offer";
import {getCities} from "../../reducer/data/selectors";

const mapStateToProps = (state) => ({
  offer: getActiveOffer(state),
  // authorizationStatus: getAuthorizationStatus(state),
  // reviews: getReviews(state),
  // nearbyOffers: getNearbyOffers(state),
  // cities: getCities(state),
});

export default connect(mapStateToProps)(DetailOffer);
