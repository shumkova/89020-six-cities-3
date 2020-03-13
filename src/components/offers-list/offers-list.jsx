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
  onHeaderClick: PropTypes.func.isRequired,
  onItemHover: PropTypes.func.isRequired,
};

export default OffersList;
