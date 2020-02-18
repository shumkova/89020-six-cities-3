import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";

const App = (props) => {
  const {placesFound, offers} = props;

  return (
    <Main
      placesFound={placesFound}
      offers={offers}
    />
  );
};

App.propTypes = {
  placesFound: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
};

export default App;
