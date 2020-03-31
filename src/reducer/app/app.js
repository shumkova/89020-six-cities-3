import {extend} from "../../utils";
import EditComment from "../../adapters/edit-comment";

const initialState = {
  city: ``,
  offer: {},
  reviews: [],
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFER: `SET_OFFER`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
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

  loadReviews: (reviews) => ({
    type: ActionTypes.LOAD_REVIEWS,
    payload: reviews,
  })
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

    case ActionTypes.LOAD_REVIEWS: {
      return extend(state, {
        reviews: action.payload,
      });
    }
  }

  return state;
};

const Operation = {
  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/` + id)
      .then((response) => {
        const reviews = EditComment.parseComments(response.data);

        dispatch(ActionCreator.loadReviews(reviews));
      })
      .catch((err) => {
        throw err;
      });
  },
};

export {reducer, ActionTypes, ActionCreator, Operation};
