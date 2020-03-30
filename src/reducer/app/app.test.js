import {reducer, ActionTypes, ActionCreator} from "./app";

const OFFER = {
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
};

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      city: ``,
      offer: {},
    });
  });

  it(`Reducer should change city`, () => {
    expect(reducer({
      city: ``,
      offer: {},
    }, {
      type: ActionTypes.CHANGE_CITY,
      payload: `Amsterdam`,
    })).toEqual({
      city: `Amsterdam`,
      offer: {},
    });
  });

  it(`Reducer should change offer`, () => {
    expect(reducer({
      city: `Hamburg`,
      offer: {},
    }, {
      type: ActionTypes.SET_OFFER,
      payload: OFFER,
    })).toEqual({
      city: `Hamburg`,
      offer: OFFER,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator returns object with new city`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionTypes.CHANGE_CITY,
      payload: `Paris`,
    });
  });

  it(`Action creator returns object with new offer`, () => {
    expect(ActionCreator.setOffer(OFFER)).toEqual({
      type: ActionTypes.SET_OFFER,
      payload: OFFER,
    });
  });
});
