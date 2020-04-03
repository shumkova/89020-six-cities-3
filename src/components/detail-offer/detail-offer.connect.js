import {getReviews, getNearbyOffers, getCurrentOffer} from "../../reducer/app/selectors";
import {connect} from "react-redux";
import DetailOffer from "./detail-offer";
import {getCities, getOfferById} from "../../reducer/data/selectors";
import {Operation} from "../../reducer/operation";

const mapStateToProps = (state) => ({
  offer: getOfferById(state, getCurrentOffer(state)),
  reviews: getReviews(state),
  nearbyOffers: getNearbyOffers(state),
  cities: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  postReview(id, review) {
    dispatch(Operation.postReview(id, review));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailOffer);
