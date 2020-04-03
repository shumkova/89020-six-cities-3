import {createSelector} from "reselect";
import NameSpace from "../name-space";

const getHotels = (state) => {
  return state[NameSpace.DATA].hotels;
};

const getCity = (state) => {
  return state[NameSpace.APP].city;
};

const getFavorites = (state) => {
  return state[NameSpace.DATA].hotels.filter((hotel) => (
    hotel.isFavorite
  ));
};

const getOfferById = (state, id) => {
  return state[NameSpace.DATA].hotels.find((hotel) => {
    return hotel.id === id;
  });
};

const getInitialCity = createSelector(
    getHotels,
    (hotels) => {
      if (hotels.length) {
        return hotels[0].city.name;
      }

      return ``;
    }
);

const getOffers = createSelector(
    getHotels,
    getCity,
    (hotels, city) => {
      return hotels.filter((hotel) => hotel.city.name === city);
    }
);

const getCities = createSelector(
    getHotels,
    (hotels) => {
      const citiesNames = new Set();

      hotels.forEach((hotel) => {
        citiesNames.add(hotel.city.name);
      });

      const hotelsWithUniqCities = Array.of(...citiesNames)
        .map((city) => {
          return hotels.find((hotel) => {
            return hotel.city.name === city;
          });
        });

      const cities = hotelsWithUniqCities.map((hotel) => {
        return hotel.city;
      });

      return cities;
    }
);

const getAppState = (state) => {
  return state[NameSpace.DATA].appState;
};

export {getHotels, getInitialCity, getOffers, getCities, getAppState, getOfferById, getFavorites};
