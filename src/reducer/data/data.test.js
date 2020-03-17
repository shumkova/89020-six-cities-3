import {reducer, ActionTypes} from "./data";

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
    type: ActionTypes.LOAD_HOTELS,
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
    type: ActionTypes.ACTIVATE_APP,
    payload: true,
  })).toEqual({
    hotels: [],
    applicationIsReady: true,
  });
});
