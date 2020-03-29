import React from "react";
import PropTypes from "prop-types";

const CitiesList = (props) => {
  const {cities, onCityClick, activeCity} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city.name}>
          <a className={`locations__item-link tabs__item ${city.name === activeCity ? `tabs__item--active` : ``}`} href="#"
            onClick={(evt) => {
              onCityClick(evt, city.name);
            }}
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
  onCityClick: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
};

export default CitiesList;
