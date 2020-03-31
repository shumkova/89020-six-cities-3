import {extend} from "../../utils";
import {AppState} from "../../const";

const initialState = {
  hotels: [],
  appState: AppState.PENDING,
};

const ActionTypes = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  CHANGE_APP_READINESS: `CHANGE_APP_READINESS`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
};

const ActionCreator = {
  loadHotels: (hotels) => ({
    type: ActionTypes.LOAD_HOTELS,
    payload: hotels,
  }),

  changeAppReadiness: (readiness) => ({
    type: ActionTypes.CHANGE_APP_READINESS,
    payload: readiness,
  }),

  loadFavorites: (offers) => ({
    type: ActionTypes.LOAD_FAVORITES,
    payload: offers,
  }),

  changeFavorite: (hotel) => ({
    type: ActionTypes.CHANGE_FAVORITE,
    payload: hotel,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_HOTELS: {
      return extend(state, {
        hotels: action.payload,
      });
    }

    case ActionTypes.CHANGE_APP_READINESS: {
      return extend(state, {
        appState: AppState.READY,
      });
    }

    case ActionTypes.LOAD_FAVORITES: {
      return extend(state, {
        hotels: state.hotels.map((hotel) => {
          const favoriteHotel = action.payload.find((elem) => {
            return elem.id === hotel.id;
          });

          return favoriteHotel ? extend(hotel, {
            isFavorite: true,
          }) : hotel;
        })
      });
    }

    case ActionTypes.CHANGE_FAVORITE: {
      return extend(state, {
        hotels: state.hotels.map((hotel) => (hotel.id === action.payload.id ?
          extend(hotel, {
            isFavorite: action.payload.isFavorite
          }) : hotel)),
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionTypes};
