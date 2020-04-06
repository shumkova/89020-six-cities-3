import {ActionCreator as DataActionCreator} from "./data/data";
import {ActionCreator as AppActionCreator} from "./app/app";
import EditOffer from "../adapters/edit-offer";
import {AppRoute, AppState} from "../const";
import EditComment from "../adapters/edit-comment";
import history from "../history";

export const Operation = {
  init: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const hotels = EditOffer.parseOffers(response.data);
        dispatch(DataActionCreator.loadHotels(hotels));

        const cities = [...new Set(hotels.map((item) => item.city.name))];

        dispatch(AppActionCreator.changeCity(cities.length ? cities[0] : ``));
      })
      .then(() => {
        if (!id) {
          dispatch(DataActionCreator.changeAppReadiness(AppState.READY));
        }
      });
  },

  loadDetailOfferInfo: (id) => (dispatch, getState, api) => {
    dispatch(DataActionCreator.changeAppReadiness(AppState.PENDING));
    dispatch(AppActionCreator.setActiveOffer(null));
    dispatch(AppActionCreator.setCurrentOffer(id));

    return api.get(`/comments/` + id)
      .then((response) => {
        const reviews = EditComment.parseComments(response.data);
        dispatch(AppActionCreator.loadReviews(reviews));
      })
      .then(() => {
        return api.get(`/hotels/${id}/nearby`);
      })
      .then((response) => {
        const offers = EditOffer.parseOffers(response.data);
        dispatch(AppActionCreator.loadNearbyOffers(offers));
        dispatch(DataActionCreator.changeAppReadiness(AppState.READY));
        history.push(AppRoute.OFFER + `/${id}`);
      })
      .catch((err) => {
        throw err;
      });
  },
};
