import {ActionCreator as DataActionCreator} from "./data/data";
import {ActionCreator as AppActionCreator} from "./app/app";
import EditOffer from "../adapters/edit-offer";

export const Operation = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const hotels = EditOffer.parseOffers(response.data);
        dispatch(DataActionCreator.loadHotels(hotels));

        const cities = [...new Set(hotels.map((item) => item.city.name))];

        dispatch(AppActionCreator.changeCity(cities.length ? cities[0] : ``));
        dispatch(DataActionCreator.activateApp());
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
  }
};
