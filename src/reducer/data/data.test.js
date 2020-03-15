import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api";
import {reducer, ActionType, Operation} from "./data";

const api = createApi(() => {});

const HOTELS = [{
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

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    hotels: [],
    applicationIsReady: false,
  });
});

it(`Reducer should update hotels by load hotels`, () => {
  expect(reducer({
    hotels: [],
    applicationIsReady: false,
  }, {
    type: ActionType.LOAD_HOTELS,
    payload: HOTELS,
  })).toEqual({
    hotels: HOTELS,
    applicationIsReady: false,
  });
});

it(`Reducer should change readiness to true`, () => {
  expect(reducer({
    hotels: [],
    applicationIsReady: false,
  }, {
    type: ActionType.ACTIVATE_APP,
    payload: true,
  })).toEqual({
    hotels: [],
    applicationIsReady: true,
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /hotels and change application's state`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelsLoader = Operation.loadHotels();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return hotelsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_HOTELS,
          payload: [{fake: true}],
        });

        // expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.ACTIVATE_APP,
          payload: true,
        });
      });
  });
});
