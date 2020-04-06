import {reducer, ActionTypes, ActionCreator, Operation} from "./data";
import {createApi} from "../../api.js";
import {AppState} from "../../const";
import MockAdapter from "axios-mock-adapter";

const api = createApi(() => {});

const HOTELS = [{
  bedrooms: 3,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    name: `Amsterdam`
  },
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    avatar: `img/1.png`,
    id: 3,
    isPro: true,
    name: `Angelina`
  },
  id: 1,
  images: [`img/1.png`, `img/2.png`],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  adults: 4,
  preview: `img/1.png`,
  price: 120,
  rating: 4.8,
  title: `Beautiful & luxurious studio at great location`,
  type: `apartment`
}];

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

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    hotels: [],
    appState: AppState.PENDING,
  });
});

it(`Reducer should update hotels by load hotels`, () => {
  expect(reducer({
    hotels: [],
    appState: false,
  }, {
    type: ActionTypes.LOAD_HOTELS,
    payload: HOTELS,
  })).toEqual({
    hotels: HOTELS,
    appState: false,
  });
});

it(`Reducer should change readiness to true`, () => {
  expect(reducer({
    hotels: [],
    appState: AppState.PENDING,
  }, {
    type: ActionTypes.CHANGE_APP_READINESS,
    payload: AppState.READY,
  })).toEqual({
    hotels: [],
    appState: AppState.READY,
  });
});

describe(`Action creators for data work correctly`, () => {
  it(`Action creator returns object with hotels`, () => {
    expect(ActionCreator.loadHotels(HOTELS)).toEqual({
      type: ActionTypes.LOAD_HOTELS,
      payload: HOTELS,
    });
  });

  it(`Action creator returns object with app readiness`, () => {
    expect(ActionCreator.changeAppReadiness(AppState.READY)).toEqual({
      type: ActionTypes.CHANGE_APP_READINESS,
      payload: AppState.READY,
    });
  });

  it(`Action creator returns object with offers`, () => {
    expect(ActionCreator.loadFavorites(HOTELS)).toEqual({
      type: ActionTypes.LOAD_FAVORITES,
      payload: HOTELS,
    });
  });

  it(`Action creator returns object with offer`, () => {
    expect(ActionCreator.changeFavorite(HOTELS[0])).toEqual({
      type: ActionTypes.CHANGE_FAVORITE,
      payload: HOTELS[0],
    });
  });
});

describe(`Operations for data work correctly`, () => {
  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, rawHotels);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_FAVORITES,
          payload: HOTELS,
        });
      });
  });
});
