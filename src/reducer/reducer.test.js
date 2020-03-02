import {reducer, ActionType, ActionCreator} from "./reducer";

const allOffers = [
  {
    img: `img/apartment-01.jpg`,
    title: `Beautiful & luxurious apartment at great location`,
    price: 120,
    type: `Appartment`,
    point: [52.3909553943508, 4.85309666406198],
    city: `Amsterdam`,
  },
  {
    img: `img/room.jpg`,
    title: `Wood and stone place`,
    price: 80,
    type: `Private room`,
    point: [52.369553943508, 4.85309666406198],
    city: `Paris`,
  },
  {
    img: `img/apartment-02.jpg`,
    title: `Canal View Prinsengracht`,
    price: 132,
    type: `Appartment`,
    point: [52.3909553943508, 4.929309666406198],
    city: `Cologne`,
  },
  {
    img: `img/apartment-03.jpg`,
    title: `Nice, cozy, warm big bed apartment`,
    price: 180,
    type: `Appartment`,
    point: [52.3809553943508, 4.939309666406198],
    city: `Hamburg`,
  },
];

const filterOffers = (city, offersList) => {
  return offersList.filter((offer) => offer.city === city);
};

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      city: `Amsterdam`,
      offers: filterOffers(`Amsterdam`, allOffers),
    });
  });

  it(`Reducer should change city`, () => {
    expect(reducer({
      city: `Amsterdam`,
      offers: [],
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `Hamburg`,
    })).toEqual({
      city: `Hamburg`,
      offers: [],
    });
  });

  it(`Reducer should update offers`, () => {
    expect(reducer({
      city: `Hamburg`,
      offers: [],
    }, {
      type: ActionType.GET_OFFERS,
      payload: [{
        img: `img/apartment-03.jpg`,
        title: `Nice, cozy, warm big bed apartment`,
        price: 180,
        type: `Appartment`,
        point: [52.3809553943508, 4.939309666406198],
        city: `Hamburg`,
      }]
    })).toEqual({
      city: `Hamburg`,
      offers: [{
        img: `img/apartment-03.jpg`,
        title: `Nice, cozy, warm big bed apartment`,
        price: 180,
        type: `Appartment`,
        point: [52.3809553943508, 4.939309666406198],
        city: `Hamburg`,
      }]
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator returns object with new city`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    });
  });

  it(`Action creator returns object with filtered offers`, () => {
    expect(ActionCreator.getOffers(`Paris`)).toEqual({
      type: ActionType.GET_OFFERS,
      payload: [{
        img: `img/room.jpg`,
        title: `Wood and stone place`,
        price: 80,
        type: `Private room`,
        point: [52.369553943508, 4.85309666406198],
        city: `Paris`,
      }]
    });
  });
});


