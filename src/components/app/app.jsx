import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";

const cityCords = [52.38333, 4.9];

const nameClickHandler = () => {};

const App = (props) => {
  const {placesFound, offers} = props;

  return (
    <Main
      placesFound={placesFound}
      onHeaderClick={nameClickHandler}
      offers={offers}
      cityCords={cityCords}
    />
  );
};

App.propTypes = {
  placesFound: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default App;
