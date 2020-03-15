import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/state/state";
import {connect} from "react-redux";
import Main from "../main/main";

import {getOffers, getCities, getReady} from "../../reducer/data/selectors";
import {getCity} from "../../reducer/state/selectors";

const nameClickHandler = () => {};

const App = (props) => {
  const {offers, onCityClick, city, cities, ready} = props;


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
    />
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    "bedrooms": PropTypes.number.isRequired,
    "city": PropTypes.shape({
      "name": PropTypes.string.isRequired,
      "location": PropTypes.shape({
        "latitude": PropTypes.number.isRequired,
        "longitude": PropTypes.number.isRequired,
        "zoom": PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    "description": PropTypes.string.isRequired,
    "goods": PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    "host": PropTypes.shape({
      'avatar_url': PropTypes.string.isRequired,
      'id': PropTypes.number.isRequired,
      'name': PropTypes.string.isRequired,
    }),
    "id": PropTypes.number.isRequired,
    "images": PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    "is_favorite": PropTypes.bool.isRequired,
    "is_premium": PropTypes.bool.isRequired,
    "location": PropTypes.shape({
      "latitude": PropTypes.number.isRequired,
      "longitude": PropTypes.number.isRequired,
      "zoom": PropTypes.number.isRequired,
    }).isRequired,
    "max_adults": PropTypes.number.isRequired,
    "preview_image": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "rating": PropTypes.number.isRequired,
    "title": PropTypes.string.isRequired,
    "type": PropTypes.string.isRequired,
  })).isRequired,
  onCityClick: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  // cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  ready: getReady(state),
  city: getCity(state),
  offers: getOffers(state),
  cities: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
