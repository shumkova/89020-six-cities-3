import {ActionCreator as DataActionCreator} from "./data/data";
import {ActionCreator as AppActionCreator} from "./app/app";
import EditOffer from "../adapters/edit-offer";
import {ActionCreator as FavoritesActionCreator} from "./favorites/favorites";

export const Operation = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const hotels = EditOffer.parseOffers(response.data);
        dispatch(DataActionCreator.loadHotels(hotels));
        dispatch(DataActionCreator.activateApp());

        const cities = [...new Set(hotels.map((item) => item.city.name))];

        dispatch(AppActionCreator.changeCity(cities.length ? cities[0] : ``));
      });
  },

  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const offers = EditOffer.parseOffers(response.data);
        dispatch(FavoritesActionCreator.loadFavorites(offers));
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
        dispatch(FavoritesActionCreator.changeFavorite(updatedOffer));
        dispatch(DataActionCreator.changeFavorite(updatedOffer));
      });
  }
};
