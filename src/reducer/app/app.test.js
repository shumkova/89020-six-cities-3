import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api.js";
import {reducer, ActionTypes, ActionCreator, LoadingStatus, Operation} from "./app";
import {SortTypes} from "../../const";
import moment from "moment";
import EditComment from "../../adapters/edit-comment";
import EditOffer from "../../adapters/edit-offer";

const api = createApi(() => {});

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

const rawOffers = [{
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

const REVIEWS = [{
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  date: moment(`2019-05-08T14:13:56.569Z`),
  id: 1,
  rating: 4,
  user: {
    avatar: `img/1.png`,
    id: 4,
    isPro: false,
    name: `Max`,
  }
}];

const REVIEWS_RAW = [{
  "comment": `A qui et cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "date": `2019-05-08T14:13:56.569Z`,
  "id": 1,
  "rating": 4,
  "user": {
    "avatar_url": `img/1.png`,
    "id": 4,
    "is_pro": false,
    "name": `Max`
  }
}];

describe(`Reducer for app works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      city: ``,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    });
  });

  it(`Reducer should change city`, () => {
    expect(reducer({
      city: ``,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    }, {
      type: ActionTypes.CHANGE_CITY,
      payload: `Amsterdam`,
    })).toEqual({
      city: `Amsterdam`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    });
  });

  it(`Reducer should change active offer id`, () => {
    expect(reducer({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    }, {
      type: ActionTypes.SET_ACTIVE_OFFER,
      payload: 1,
    })).toEqual({
      city: `Hamburg`,
      activeOffer: 1,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    });
  });

  it(`Reducer should change current offer id`, () => {
    expect(reducer({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    }, {
      type: ActionTypes.SET_CURRENT_OFFER,
      payload: 1,
    })).toEqual({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: 1,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    });
  });

  it(`Reducer should set reviews`, () => {
    expect(reducer({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    }, {
      type: ActionTypes.LOAD_REVIEWS,
      payload: REVIEWS,
    })).toEqual({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: REVIEWS,
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    });
  });

  it(`Reducer should set nearby offers`, () => {
    expect(reducer({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    }, {
      type: ActionTypes.LOAD_NEARBY,
      payload: [OFFER],
    })).toEqual({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [OFFER],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    });
  });

  it(`Reducer should change sorting type`, () => {
    expect(reducer({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    }, {
      type: ActionTypes.SET_SORTING_TYPE,
      payload: SortTypes.TOP_RATED,
    })).toEqual({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.TOP_RATED,
      reviewLoadingStatus: ``,
    });
  });

  it(`Reducer should change reviews loading status`, () => {
    expect(reducer({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    }, {
      type: ActionTypes.SET_REVIEW_LOADING_STATUS,
      payload: LoadingStatus.DISABLED,
    })).toEqual({
      city: `Hamburg`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: LoadingStatus.DISABLED,
    });
  });
});

describe(`Action creators for app work correctly`, () => {
  it(`Action creator returns object with new city`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionTypes.CHANGE_CITY,
      payload: `Paris`,
    });
  });

  it(`Action creator returns object with new active offer id`, () => {
    expect(ActionCreator.setActiveOffer(OFFER.id)).toEqual({
      type: ActionTypes.SET_ACTIVE_OFFER,
      payload: OFFER.id,
    });
  });

  it(`Action creator returns object with new current offer id`, () => {
    expect(ActionCreator.setCurrentOffer(OFFER)).toEqual({
      type: ActionTypes.SET_CURRENT_OFFER,
      payload: OFFER,
    });
  });

  it(`Action creator returns object with reviews`, () => {
    expect(ActionCreator.loadReviews([REVIEWS])).toEqual({
      type: ActionTypes.LOAD_REVIEWS,
      payload: [REVIEWS],
    });
  });

  it(`Action creator returns object with nearby offers`, () => {
    expect(ActionCreator.loadNearbyOffers([OFFER])).toEqual({
      type: ActionTypes.LOAD_NEARBY,
      payload: [OFFER],
    });
  });

  it(`Action creator returns object with sorting type`, () => {
    expect(ActionCreator.setSortingType(SortTypes.TOP_RATED)).toEqual({
      type: ActionTypes.SET_SORTING_TYPE,
      payload: SortTypes.TOP_RATED,
    });
  });

  it(`Action creator returns object with reviews loading status`, () => {
    expect(ActionCreator.setReviewLoadingStatus(LoadingStatus.DISABLED)).toEqual({
      type: ActionTypes.SET_REVIEW_LOADING_STATUS,
      payload: LoadingStatus.DISABLED,
    });
  });
});

describe(`Operations for app work correctly`, () => {
  it(`Should make a correct API call to /comments/:id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadReviews(1);

    apiMock
      .onGet(`/comments/` + 1)
      .reply(200, REVIEWS_RAW);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_REVIEWS,
          payload: EditComment.parseComments(REVIEWS_RAW),
        });
      });
  });

  it(`Should make a correct API call to /hotels/:id/nearby`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadNearbyOffers(1);

    apiMock
      .onGet(`/hotels/1/nearby`)
      .reply(200, rawOffers);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_NEARBY,
          payload: EditOffer.parseOffers(rawOffers),
        });
      });
  });
});
