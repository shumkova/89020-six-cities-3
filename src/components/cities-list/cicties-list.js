import React from "react";
import PropTypes from "prop-types";

const CitiesList = (props) => {
  const {cities, onCityClick, activeCity} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, index) => (
        <li className="locations__item" key={`city-${index}`}>
          <a className={`locations__item-link tabs__item ${city === activeCity ? `tabs__item--active` : ``}`} href="#"
            onClick={() => {
              onCityClick(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCityClick: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
};

export default CitiesList;
