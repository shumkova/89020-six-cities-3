import {getSortType} from "../../reducer/app/selectors";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {connect} from "react-redux";
import OffersList from "./offers-list";

const mapStateToProps = (state) => ({
  sortBy: getSortType(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveOffer(offerId) {
    dispatch(AppActionCreator.setActiveOffer(offerId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
