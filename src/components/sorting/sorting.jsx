import React from "react";
import PropTypes from "prop-types";
import {SortTypes} from "../../const";

const Sorting = (props) => {
  const {sortBy, setSortingType, isActive, onToggleClick} = props;

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={onToggleClick}
    >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0">
        {sortBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive ? `places__options--opened` : ``}`}>
        {
          Object.values(SortTypes).map((type) => (
            <li
              className={`places__option ${sortBy === type ? `places__option--active` : ``}`}
              tabIndex="0"
              key={type}
              onClick={() => {
                setSortingType(type);
              }}
            >
              {type}
            </li>
          ))
        }
      </ul>
    </form>
  );
};

Sorting.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortingType: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onToggleClick: PropTypes.func.isRequired,
};

export default Sorting;
