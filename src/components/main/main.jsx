import React from "react";
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list";
import Map from "../map/map";
import CitiesList from "../cities-list/cicties-list";
import allOffers from "../../mocks/offers";
import withActiveItem from "../../hocs/with-active-item/with-active-item";

const OffersListWrapped = withActiveItem(OffersList);

const Main = (props) => {
  const {offers, cityCords, onHeaderClick, onCityClick, city} = props;

  const coordinates = offers.map((offer) => offer.point);

  const cities = new Set();

  allOffers.forEach((offer) => {
    cities.add(offer.city);
  });

  const maxCities = [...cities].slice(0, 6);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList
            activeCity={city}
            cities={maxCities}
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
                  Dusseldorf</p>
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
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  cityCords: PropTypes.arrayOf(PropTypes.number),
  onHeaderClick: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};

export default Main;

