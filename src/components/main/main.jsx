import React from "react";
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list";
import Map from "../map/map";
import CitiesList from "../cities-list/cities-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";

const OffersListWrapped = withActiveItem(OffersList);

const Main = (props) => {
  const {offers, onHeaderClick, onCityClick, city, cities} = props;

  const coordinates = offers.map((offer) => offer.location);
  const cityCords = cities.find((item) => {
    return item.name === city;
  }).location;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList
            activeCity={city}
            cities={cities}
            onCityClick={onCityClick}
          />
        </section>
      </div>
      <div className="cities">

        {offers.length ? (
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} place(es) to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>

              <OffersListWrapped
                offers={offers}
                onHeaderClick={onHeaderClick}
              />

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  coordinates={coordinates}
                  cityCords={cityCords}
                />
              </section>
            </div>
          </div>
        ) : (
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property availbale at the moment in
                  {city}</p>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

Main.propTypes = {
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
  onCityClick: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
};

export default Main;

