import {ActionCreator as DataActionCreator} from "./data/data";
import {ActionCreator as AppActionCreator} from "./app/app";
import EditOffer from "../editOffer";

export const Operation = {
  loadHotels: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const hotels = EditOffer.parseOffers(response.data);
        dispatch(DataActionCreator.loadHotels(hotels));
        dispatch(DataActionCreator.activateApp());

        const cities = [...new Set(hotels.map((item) => item.city.name))];

        dispatch(AppActionCreator.changeCity(cities[0]));
      });
  }
};
