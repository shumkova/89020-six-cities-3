import {extend} from "../../utils";

const initialState = {
  city: ``,
  offer: {},
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFER: `SET_OFFER`,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: newCity,
  }),

  setOffer: (offer) => ({
    type: ActionTypes.SET_OFFER,
    payload: offer,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionTypes.SET_OFFER:
      return extend(state, {
        offer: action.payload,
      });
  }

  return state;
};

export {reducer, ActionTypes, ActionCreator};
