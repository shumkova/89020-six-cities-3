import PropTypes from "prop-types";
import React from "react";

const OfferCard = (props) => {
  const {offer, onCardHover, onHeaderClick} = props;

  let hover = false;

  return (
    <article className="cities__place-card place-card"
      onMouseOver={() => {
        if (!hover) {
          hover = true;
          onCardHover(offer);
        }
      }}
    >
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.img} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `80%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#"
            onClick={onHeaderClick}
          >
            {offer.title}
          </a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};


OfferCard.propTypes = {
  offer: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onCardHover: PropTypes.func.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
};

export default OfferCard;
