import {Operation} from "./operation";
import MockAdapter from "axios-mock-adapter";
import {createApi} from "../api";
import {ActionTypes as DataActionTypes} from "./data/data";
import {ActionTypes as AppActionTypes} from "./app/app";
import EditOffer from "../adapters/edit-offer";
import {AppState} from "../const";

const api = createApi(() => {});

const rawHotels = [{
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.370216,
      "longitude": 4.895168,
      "zoom": 10
    },
    "name": `Amsterdam`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  "host": {
    "avatar_url": `img/1.png`,
    "id": 3,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 1,
  "images": [`img/1.png`, `img/2.png`],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 52.35514938496378,
    "longitude": 4.673877537499948,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": `img/1.png`,
  "price": 120,
  "rating": 4.8,
  "title": `Beautiful & luxurious studio at great location`,
  "type": `apartment`
}];

const hotels = EditOffer.parseOffers(rawHotels);

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /hotels, change application's state and set city`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelsLoader = Operation.loadHotels();

    apiMock
      .onGet(`/hotels`)
      .reply(200, rawHotels);

    return hotelsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: DataActionTypes.LOAD_HOTELS,
          payload: hotels,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: AppActionTypes.CHANGE_CITY,
          payload: `Amsterdam`,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: DataActionTypes.CHANGE_APP_READINESS,
          payload: AppState.READY,
        });
      });
  });
});
