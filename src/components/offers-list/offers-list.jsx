import PropTypes from "prop-types";
import React from "react";
import OfferCard from "../offer-card/offer-card.connect";
import {sortOffers} from "../../utils";

const OffersList = (props) => {
  const {offers, onHeaderClick, setActiveOffer, onBookmarkClick, listType, sortBy, nearbyFor} = props;

  return (
    <div className={`places__list ${listType.list}`}>
      {sortOffers(offers, sortBy).map((offer, index) => (
        <OfferCard
          key={`place-${index}`}
          cardType={listType.card}
          offer={offer}
          index={index}
          onCardHover={setActiveOffer}
          onHeaderClick={onHeaderClick}
          onBookmarkClick={onBookmarkClick}
          nearbyFor={nearbyFor}
        />
      ))}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    bedrooms: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    host: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    adults: PropTypes.number.isRequired,
    preview: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  setActiveOffer: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  listType: PropTypes.object.isRequired,
  sortBy: PropTypes.string.isRequired,
  nearbyFor: PropTypes.number,
};

export default OffersList;
