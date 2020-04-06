import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header";
import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history";
import {AppRoute, ListTypes} from "../../const";
import ReviewsList from "../reviews-list/reviews-list";
import OffersList from "../offers-list/offers-list.connect";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import Map from "../map/map.connect";
import ReviewForm from "../review-form/review-form";

const OffersListWrapped = withActiveItem(OffersList);

const MAX_STARS = 5;

const DetailOffer = (props) => {
  const {offer, onBookmarkClick, authorizationStatus, reviews, nearbyOffers, cities, onHeaderClick, postReview, loadingStatus, clearReviewLoadingStatus} = props;

  const cityCords = cities.find((item) => {
    return item.name === offer.city.name;
  }).location;

  const percentRating = Math.round(offer.rating) / MAX_STARS * 100 + `%`;

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((img, index) => (
                <div className="property__image-wrapper" key={index}>
                  <img className="property__image" src={img} alt="Photo studio"></img>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : ``
              }

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button
                  className={`property__bookmark-button button${offer.isFavorite ? ` property__bookmark-button--active` : ``}`}
                  type="button"
                  onClick={() => {
                    return authorizationStatus === AuthorizationStatus.AUTH ?
                      onBookmarkClick(offer) :
                      history.push(AppRoute.LOGIN);
                  }}>
                  <svg className="place-card__bookmark-icon property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: percentRating}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={`../` + offer.host.avatar} width="74" height="74" alt="Host avatar"></img>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>

              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

                {(reviews.length > 0) && <ReviewsList reviews={reviews} />}

                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <ReviewForm
                    id={offer.id}
                    onSubmit={postReview}
                    loadingStatus={loadingStatus}
                    clearReviewLoadingStatus={clearReviewLoadingStatus}
                  /> :
                  <></>
                }
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map places={nearbyOffers} cityCords={cityCords}/>
          </section>
        </section>
        {nearbyOffers.length && <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersListWrapped
              offers={nearbyOffers}
              onHeaderClick={onHeaderClick}
              onBookmarkClick={onBookmarkClick}
              listType={ListTypes.NEARBY}
            >
            </OffersListWrapped>
          </section>
        </div>}
      </main>
    </div>
  );
};

DetailOffer.propTypes = {
  offer: PropTypes.shape({
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
  }).isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    comment: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  nearbyOffers: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  loadingStatus: PropTypes.string.isRequired,
  clearReviewLoadingStatus: PropTypes.func.isRequired,
};

export default DetailOffer;
