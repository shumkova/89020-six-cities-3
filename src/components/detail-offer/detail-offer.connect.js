import {getReviews, getNearbyOffers, getCurrentOffer} from "../../reducer/app/selectors";
import {connect} from "react-redux";
import DetailOffer from "./detail-offer";
import {getCities, getOfferById} from "../../reducer/data/selectors";

const mapStateToProps = (state) => ({
  offer: getOfferById(state, getCurrentOffer(state)),
  reviews: getReviews(state),
  nearbyOffers: getNearbyOffers(state),
  cities: getCities(state),
});

export default connect(mapStateToProps)(DetailOffer);
