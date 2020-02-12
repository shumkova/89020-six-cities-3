import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  const {rentalOffersCount, rentalOffers} = props;

  return (
    <Main
      rentalOffersCount={rentalOffersCount}
      rentalOffers={rentalOffers}
    />
  );
};

App.propTypes = {
  rentalOffersCount: PropTypes.number.isRequired,
  rentalOffers: PropTypes.array.isRequired,
};

export default App;
