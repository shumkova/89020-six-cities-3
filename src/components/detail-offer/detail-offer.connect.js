import {getReviews, getNearbyOffers, getCurrentOffer, getLoadingStatus} from "../../reducer/app/selectors";
import {connect} from "react-redux";
import DetailOffer from "./detail-offer";
import {getCities, getOfferById} from "../../reducer/data/selectors";
import {Operation} from "../../reducer/operation";
import {ActionCreator} from "../../reducer/app/app";

const mapStateToProps = (state) => ({
  offer: getOfferById(state, getCurrentOffer(state)),
  reviews: getReviews(state),
  nearbyOffers: getNearbyOffers(state),
  cities: getCities(state),
  loadingStatus: getLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  postReview(id, review) {
    dispatch(Operation.postReview(id, review));
  },
  clearReviewLoadingStatus() {
    dispatch(ActionCreator.setReviewsLoadingStatus(``));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailOffer);
