import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import OfferCard from "./offer-card";
import {Operation} from "../../reducer/app/app";

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews(id) {
    dispatch(Operation.loadReviews(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
