import {connect} from "react-redux";
import {getCities, getOffers, getAppState} from "../../reducer/data/selectors";
import {getCity} from "../../reducer/app/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation as AppOperation, ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";
import App from "./app";
import {Operation} from "../../reducer/operation";

const mapStateToProps = (state) => ({
  appState: getAppState(state),
  city: getCity(state),
  offers: getOffers(state),
  cities: getCities(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  init(id) {
    dispatch(Operation.loadHotels(id));
    dispatch(UserOperation.checkAuth());
    dispatch(DataOperation.loadFavorites());
    if (id) {
      dispatch(Operation.loadDetailOfferInfo(id));
    }
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  changeCity(city) {
    dispatch(AppActionCreator.changeCity(city));
  },
  loadCurrentOffer(offerId) {
    dispatch(Operation.loadDetailOfferInfo(offerId));
  },
  changeFavorite(offer, nearbyFor) {
    dispatch(DataOperation.changeFavorite(offer))
      .then(() => {
        if (nearbyFor) {
          dispatch(AppOperation.loadNearbyOffers(nearbyFor));
        }
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
