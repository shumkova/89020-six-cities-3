import {extend} from "../../utils";
import EditComment from "../../adapters/edit-comment";
import EditOffer from "../../adapters/edit-offer";
import {SortTypes} from "../../const";

const LoadingStatus = {
  DISABLED: `DISABLED`,
  SUCCESS: `SUCCESS`,
  FAILED: `FAILED`
};

const initialState = {
  city: ``,
  activeOffer: null,
  currentOffer: null,
  reviews: [],
  nearbyOffers: [],
  sortType: SortTypes.POPULAR,
  reviewLoadingStatus: ``,
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY: `LOAD_NEARBY`,
  SET_SORTING_TYPE: `SET_SORTING_TYPE`,
  SET_REVIEW_LOADING_STATUS: `SET_REVIEW_LOADING_STATUS`,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: newCity,
  }),

  setActiveOffer: (offerId) => ({
    type: ActionTypes.SET_ACTIVE_OFFER,
    payload: offerId,
  }),

  setCurrentOffer: (offerId) => ({
    type: ActionTypes.SET_CURRENT_OFFER,
    payload: offerId,
  }),

  loadReviews: (reviews) => ({
    type: ActionTypes.LOAD_REVIEWS,
    payload: reviews,
  }),

  loadNearbyOffers: (offers) => ({
    type: ActionTypes.LOAD_NEARBY,
    payload: offers,
  }),

  setSortingType: (type) => ({
    type: ActionTypes.SET_SORTING_TYPE,
    payload: type,
  }),

  setReviewLoadingStatus: (status) => ({
    type: ActionTypes.SET_REVIEW_LOADING_STATUS,
    payload: status,
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

    case ActionTypes.SET_CURRENT_OFFER:
      return extend(state, {
        currentOffer: action.payload,
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

    case ActionTypes.SET_SORTING_TYPE: {
      return extend(state, {
        sortType: action.payload,
      });
    }

    case ActionTypes.SET_REVIEW_LOADING_STATUS: {
      return extend(state, {
        reviewLoadingStatus: action.payload,
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
  },

  postReview: (id, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setReviewLoadingStatus(LoadingStatus.DISABLED));
    return api.post(`/comments/` + id, review)
      .then((response) => {
        const reviews = EditComment.parseComments(response.data);
        dispatch(ActionCreator.loadReviews(reviews));
        dispatch(ActionCreator.setReviewLoadingStatus(LoadingStatus.SUCCESS));
      })
      .catch((err) => {
        dispatch(ActionCreator.setReviewLoadingStatus(LoadingStatus.FAILED));
        throw err;
      });
  },
};

export {reducer, ActionTypes, ActionCreator, Operation, LoadingStatus};
