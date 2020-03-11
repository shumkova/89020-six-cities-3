import {createSelector} from "reselect";
import NameSpace from "../name-space";

const getHotels = (state) => {
  console.log(`hotels:`);
  console.log(state[NameSpace.DATA].hotels);
  return state[NameSpace.DATA].hotels;
};

const getCity = (state) => {
  return state[NameSpace.STATE].city;
};

const getInitialCity = createSelector(
    getHotels,
    (hotels) => {
      return hotels[0].city;
    }
);

const getOffers = createSelector(
    getHotels,
    getCity,
    (hotels, city) => {
      return hotels.filter((hotel) => hotel.city === city);
    }
);

const getCities = createSelector(
    getHotels,
    (hotels) => {
      const cities = new Set();

      hotels.forEach((hotel) => {
        cities.add(hotel.city);
      });

      return cities;
    }
);


export {getHotels, getInitialCity, getOffers, getCities};
