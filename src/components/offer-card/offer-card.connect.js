import {getAuthorizationStatus} from "../../reducer/user/selectors";
// import {Operation} from "../../reducer/operation";
import {connect} from "react-redux";
import OfferCard from "./offer-card";

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

// const mapDispatchToProps = (dispatch) => ({
//   onBookmarkClick(offer) {
//     dispatch(Operation.changeFavorite(offer));
//   },
// });

export default connect(mapStateToProps)(OfferCard);
