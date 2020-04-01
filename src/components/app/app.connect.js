import {connect} from "react-redux";
import {getCities, getOffers, getAppState} from "../../reducer/data/selectors";
import {getCity} from "../../reducer/app/selectors";
import {getAuthInfo, getAuthorizationStatus} from "../../reducer/user/selectors";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data";
import {Operation as UserOperation} from "../../reducer/user/user";
import App from "./app";
import {Operation} from "../../reducer/operation";
import {AppState} from "../../const";

const mapStateToProps = (state) => ({
  appState: getAppState(state),
  city: getCity(state),
  offers: getOffers(state),
  cities: getCities(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getAuthInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  changeCity(evt, city) {
    dispatch(AppActionCreator.changeCity(city));
  },
  setActiveOffer(offer) {
    dispatch(DataActionCreator.changeAppReadiness(AppState.PENDING));
    dispatch(AppActionCreator.setActiveOffer(offer));
    dispatch(Operation.loadDetailOfferInfo(offer.id));
  },
  changeFavorite(offer) {
    dispatch(Operation.changeFavorite(offer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
