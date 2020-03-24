import {extend} from "../../utils";
// import EditOffer from "../../adapters/edit-offer";

const initialState = {
  favorites: [],
};

const ActionTypes = {
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  // ADD_FAVORITE: `ADD_FAVORITE`,
  // REMOVE_FAVORITE: `REMOVE_FAVORITE`,
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

// const Operation = {
//   loadFavorites: () => (dispatch, getState, api) => {
//     return api.get(`/favorite`)
//       .then((response) => {
//         const offers = EditOffer.parseOffers(response.data);
//         dispatch(ActionCreator.loadFavorites(offers));
//       });
//   },
//
//   changeFavorite: (offer) => (dispatch, getState, api) => {
//     const status = offer.isFavorite ? 0 : 1;
//     return api.post(`/favorite/${offer.id}/${status}`, {
//       "hotel_id": offer.id,
//       status
//     })
//       .then((response) => {
//         const updatedOffer = EditOffer.parseOffer(response.data);
//         dispatch(ActionCreator.changeFavorite(updatedOffer));
//       });
//   }
// };

export {reducer, ActionTypes, ActionCreator};
