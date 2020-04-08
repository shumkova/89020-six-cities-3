import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.connect";
import OfferCard from "../offer-card/offer-card.connect";
import {AppRoute, ListTypes} from "../../const";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import {Link} from "react-router-dom";

const Favorites = (props) => {
  const {favorites, authorizationStatus, onHeaderClick, onBookmarkClick} = props;

  const cities = new Set(favorites.map((item) => (item.city.name)));

  return (
    <div className="page">
      <Header/>

      {favorites.length ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Array.from(cities).map((city) => (
                  <React.Fragment key={city}>
                    <li className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {
                          favorites.filter((item) => (item.city.name === city)).map((offer) => (
                            <React.Fragment key={offer.id}>
                              <OfferCard
                                offer={offer}
                                onCardHover={() => {}}
                                onHeaderClick={onHeaderClick}
                                onBookmarkClick={onBookmarkClick}
                                authorizationStatus={authorizationStatus}
                                cardType={ListTypes.FAVORITE.card}
                              />
                            </React.Fragment>
                          ))
                        }
                      </div>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </section>
          </div>
        </main>
        :
        <FavoritesEmpty/>
      }


      <footer className="footer container">
        <Link
          className="footer__logo-link"
          to={AppRoute.ROOT}
        >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

export default Favorites;
