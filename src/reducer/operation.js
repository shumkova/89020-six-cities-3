import {ActionCreator as DataActionCreator} from "./data/data";
import {ActionCreator as AppActionCreator} from "./app/app";
import EditOffer from "../adapters/edit-offer";
import {AppRoute, AppState} from "../const";
import EditComment from "../adapters/edit-comment";
import history from "../history";

export const Operation = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const hotels = EditOffer.parseOffers(response.data);
        dispatch(DataActionCreator.loadHotels(hotels));

        const cities = [...new Set(hotels.map((item) => item.city.name))];

        dispatch(AppActionCreator.changeCity(cities.length ? cities[0] : ``));
        dispatch(DataActionCreator.changeAppReadiness(AppState.READY));
      });
  },

  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const offers = EditOffer.parseOffers(response.data);
        dispatch(DataActionCreator.loadFavorites(offers));
      });
  },

  changeFavorite: (offer) => (dispatch, getState, api) => {
    const status = offer.isFavorite ? 0 : 1;
    return api.post(`/favorite/${offer.id}/${status}`, {
      "hotel_id": offer.id,
      status
    })
      .then((response) => {
        const updatedOffer = EditOffer.parseOffer(response.data);
        dispatch(DataActionCreator.changeFavorite(updatedOffer));
      });
  },

  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/` + id)
      .then((response) => {
        const reviews = EditComment.parseComments(response.data);

        dispatch(AppActionCreator.loadReviews(reviews));
      })
      .catch((err) => {
        throw err;
      });
  },

  loadNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        const offers = EditOffer.parseOffers(response.data);
        dispatch(AppActionCreator.loadNearbyOffers(offers));
        dispatch(DataActionCreator.changeAppReadiness(AppState.READY));
      })
      .catch((err) => {
        throw err;
      });
  },

  loadDetailOfferInfo: (id) => (dispatch, getState, api) => {
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
      })
      .then(() => {
        dispatch(DataActionCreator.changeAppReadiness(AppState.READY));
        history.push(AppRoute.OFFER + `/${id}`);
      })
      .catch((err) => {
        throw err;
      });
  },
};
