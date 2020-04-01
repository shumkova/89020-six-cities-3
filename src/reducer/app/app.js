import {extend} from "../../utils";
import EditComment from "../../adapters/edit-comment";
import EditOffer from "../../adapters/edit-offer";
import {AppState} from "../../const";

const initialState = {
  city: ``,
  activeOffer: {},
  reviews: [],
  nearbyOffers: [],
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY: `LOAD_NEARBY`,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: newCity,
  }),

  setActiveOffer: (offer) => ({
    type: ActionTypes.SET_ACTIVE_OFFER,
    payload: offer,
  }),

  loadReviews: (reviews) => ({
    type: ActionTypes.LOAD_REVIEWS,
    payload: reviews,
  }),

  loadNearbyOffers: (offers) => ({
    type: ActionTypes.LOAD_NEARBY,
    payload: offers,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionTypes.SET_ACTIVE_OFFER:
      return extend(state, {
        activeOffer: action.payload,
      });

    case ActionTypes.LOAD_REVIEWS: {
      return extend(state, {
        reviews: action.payload,
      });
    }

    case ActionTypes.LOAD_NEARBY: {
      return extend(state, {
        nearbyOffers: action.payload,
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

  loadNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        const offers = EditOffer.parseOffers(response.data);
        dispatch(ActionCreator.loadNearbyOffers(offers));
      })
      .catch((err) => {
        throw err;
      });
  }
};

export {reducer, ActionTypes, ActionCreator, Operation};
