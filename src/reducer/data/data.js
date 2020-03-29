import {extend} from "../../utils";

const initialState = {
  hotels: [],
  applicationIsReady: false,
};

const ActionTypes = {
  LOAD_HOTELS: `LOAD_HOTELS`,
  ACTIVATE_APP: `ACTIVATE_APP`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
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

  loadFavorites: (offers) => ({
    type: ActionTypes.LOAD_FAVORITES,
    payload: offers,
  }),

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

    case ActionTypes.CHANGE_FAVORITE:
      return extend(state, {
        hotels: state.hotels.map((hotel) => (hotel.id === action.payload.id ?
          extend(hotel, {
            isFavorite: action.payload.isFavorite
          }) : hotel)),
      });
  }

  return state;
};


export {reducer, ActionCreator, ActionTypes};
