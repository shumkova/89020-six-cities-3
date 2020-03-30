import React from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch} from 'react-router-dom';
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import {AppRoute} from "../../const";
import PrivateRoute from "../private-route/private-route";
import history from "../../history";
import DetailOffer from "../detail-offer/detail-offer.connect";

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {login, offers, changeCity, city, cities, ready, authorizationStatus, userData, setActiveOffer, changeFavorite} = this.props;

    if (!ready) {
      return <>pending</>;
    }

    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main
              offers={offers}
              city={city}
              cities={cities}
              authorizationStatus={authorizationStatus}
              userData={userData}
              onCityClick={changeCity}
              onHeaderClick={setActiveOffer}
              onBookmarkClick={changeFavorite}
            />
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn
              onSubmit={login}
            />
          </Route>
          <Route exact path={AppRoute.OFFER + `/:id?`}>
            <DetailOffer
              onBookmarkClick={changeFavorite}
            />
          </Route>

          <PrivateRoute
            authorizationStatus={authorizationStatus}
            exact
            path={AppRoute.FAVORITES}
            render={() => {
              return <div>favorites</div>;
            }}
          />
        </Switch>
      </Router>
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
  changeCity: PropTypes.func.isRequired,
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
  login: PropTypes.func.isRequired,
  setActiveOffer: PropTypes.func.isRequired,
  changeFavorite: PropTypes.func.isRequired,
};

export default App;

