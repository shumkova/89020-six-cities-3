import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import OfferCard from "../offer-card/offer-card";

class OffersList extends PureComponent {
  render() {
    const {offers, onHeaderClick, onItemHover} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, index) => (
          <OfferCard
            key={`place-${index}`}
            offer={offer}
            index={index}
            onCardHover={onItemHover}
            onHeaderClick={onHeaderClick}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  onItemHover: PropTypes.func.isRequired,
};

export default OffersList;
