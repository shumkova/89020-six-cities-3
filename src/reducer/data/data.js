import {extend} from "../../utils";

const initialState = {
  hotels: [],
  applicationIsReady: false,
};

const ActionTypes = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  ACTIVATE_APP: `ACTIVATE_APP`,
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
};

const ActionCreator = {
  loadHotels: (hotels) => {
    return {
      type: ActionTypes.LOAD_HOTELS,
      payload: hotels,
    };
  },

  activateApp: () => {
    return {
      type: ActionTypes.ACTIVATE_APP,
      payload: true,
    };
  },

  changeFavorite: (hotel) => {
    return {
      type: ActionTypes.CHANGE_FAVORITE,
      payload: hotel,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_HOTELS: {
      return extend(state, {
        hotels: action.payload,
      });
    }
    case ActionTypes.ACTIVATE_APP: {
      return extend(state, {
        applicationIsReady: true,
      });
    }
    case ActionTypes.SET_CITY: {
      return extend(state, {
        city: action.payload,
      });
    }
    case ActionTypes.CHANGE_FAVORITE: {
      return extend(state, {
        hotels: state.hotels.map((hotel) => (hotel.id === action.payload.id ?
          { ...hotel, isFavorite: action.payload.isFavorite} : hotel)),
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionTypes};
