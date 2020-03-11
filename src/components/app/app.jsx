import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/data/data";
import {connect} from "react-redux";
import Main from "../main/main";

import {getInitialCity, getOffers} from "../../reducer/data/selectors";

const cityCords = [52.38333, 4.9];

const nameClickHandler = () => {};

const App = (props) => {
  const {offers, onCityClick, city} = props;

  return (
    <Main
      onHeaderClick={nameClickHandler}
      onCityClick={onCityClick}
      offers={offers}
      cityCords={cityCords}
      city={city}
    />
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onCityClick: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  city: getInitialCity(state),
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
