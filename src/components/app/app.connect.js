import {connect} from "react-redux";
import {getCities, getOffers, getReady} from "../../reducer/data/selectors";
import {getCity} from "../../reducer/app/selectors";
import {getAuthInfo, getAuthorizationStatus} from "../../reducer/user/selectors";
import {ActionCreator} from "../../reducer/app/app";
import {Operation as UserOperation} from "../../reducer/user/user";
import App from "./app";

const mapStateToProps = (state) => ({
  ready: getReady(state),
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
    dispatch(ActionCreator.changeCity(city));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
