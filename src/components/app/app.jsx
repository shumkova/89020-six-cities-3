import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const nameClickHandler = () => {};

const App = (props) => {
  const {placesFound, places} = props;

  return (
    <Main
      placesFound={placesFound}
      places={places}
      onPlaceNameClick={nameClickHandler}
    />
  );
};

App.propTypes = {
  placesFound: PropTypes.number.isRequired,
  places: PropTypes.array.isRequired,
};

export default App;
