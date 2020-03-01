import {extend} from "../utils";
import allOffers from "../mocks/offers";

const filterOffers = (city, offersList) => {
  return offersList.filter((offer) => offer.city === city);
};

const initialState = {
  city: `Amsterdam`,
  offers: filterOffers(`Amsterdam`, allOffers),
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};



const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),

  getOffers: (city) => {
    const newOffers = filterOffers(city, allOffers);

    return {
      type: ActionType.GET_OFFERS,
      payload: newOffers,
    };
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};

