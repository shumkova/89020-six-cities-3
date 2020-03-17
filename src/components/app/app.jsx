import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ActionCreator} from "../../reducer/app/app";
import {connect} from "react-redux";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";

import {getOffers, getCities, getReady} from "../../reducer/data/selectors";
import {getCity} from "../../reducer/app/selectors";
import {getAuthorizationStatus, getAuthInfo} from "../../reducer/user/selectors";

const nameClickHandler = () => {};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {offers, onCityClick, city, cities, ready, authorizationStatus, userData} = this.props;

    if (!ready) {
      return <>pending</>;
    }

    return (
      <Main
        onHeaderClick={nameClickHandler}
        onCityClick={onCityClick}
        offers={offers}
        city={city}
        cities={cities}
        authorizationStatus={authorizationStatus}
        userData={userData}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-login">
            <SignIn
              onSubmit={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    host: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    adults: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onCityClick: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ready: getReady(state),
  city: getCity(state),
  offers: getOffers(state),
  cities: getCities(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getAuthInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(evt, city) {
    evt.preventDefault();
    dispatch(ActionCreator.changeCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
