import {createSelector} from "reselect";
import NameSpace from "../name-space";

const getHotels = (state) => {
  return state[NameSpace.DATA].hotels;
};

const getCity = (state) => {
  return state[NameSpace.APP].city;
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

      const hotelsWithUnicCities = Array.of(...citiesNames)
        .map((city) => {
          return hotels.find((hotel) => {
            return hotel.city.name === city;
          });
        });

      const cities = hotelsWithUnicCities.map((hotel) => {
        return hotel.city;
      });

      return cities;
    }
);

const getReady = (state) => {
  return state[NameSpace.DATA].applicationIsReady;
};


export {getHotels, getInitialCity, getOffers, getCities, getReady};
