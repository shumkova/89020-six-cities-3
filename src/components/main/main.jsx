import React from "react";
import PropTypes from "prop-types";
import OffersList from "../offers-list/offers-list.connect";
import Map from "../map/map.connect";
import CitiesList from "../cities-list/cities-list";
import Header from "../header/header.connect";
import Sorting from "../sorting/sorting.connect";
import withToggle from "../../hocs/with-toggle/with-toggle";
import MainEmpty from "../main-empty/main-empty";
import {ListTypes} from "../../const";

const SortingWrapped = withToggle(Sorting);

const Main = (props) => {
  const {offers, onHeaderClick, onCityClick, city, cities, onBookmarkClick} = props;

  const cityCords = cities.find((item) => {
    return item.name === city;
  }).location;

  return (
    <div className="page page--gray">
      <Header/>

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

                <SortingWrapped/>

                <OffersList
                  offers={offers}
                  onHeaderClick={onHeaderClick}
                  onBookmarkClick={onBookmarkClick}
                  listType={ListTypes.CITY}
                />

              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    places={offers}
                    cityCords={cityCords}
                    currentOffer={null}
                  />
                </section>
              </div>
            </div>
          ) : (
            <MainEmpty
              city={city}
            />
          )}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
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
  onBookmarkClick: PropTypes.func.isRequired,
};

export default Main;

