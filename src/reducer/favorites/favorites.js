import {extend} from "../../utils";
// import EditOffer from "../../adapters/edit-offer";

const initialState = {
  favorites: [],
};

const ActionTypes = {
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
};

const ActionCreator = {
  loadFavorites: (offers) => ({
    type: ActionTypes.LOAD_FAVORITES,
    payload: offers,
  }),

  changeFavorite: (offer) => ({
    type: ActionTypes.CHANGE_FAVORITE,
    payload: offer,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FAVORITES:
      return extend(state, {
        favorites: action.payload,
      });

    case ActionTypes.CHANGE_FAVORITE:
      return action.payload.isFavorite ?
        extend(state, {
          favorites: [action.payload, ...state.favorites],
        }) : extend(state, {
          favorites: state.favorites.filter((offer) => (offer.id !== action.payload))
        });
  }

  return state;
};

export {reducer, ActionTypes, ActionCreator};
