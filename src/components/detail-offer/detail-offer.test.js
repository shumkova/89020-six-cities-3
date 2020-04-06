import React from "react";
import renderer from "react-test-renderer";
import {AuthorizationStatus} from "../../reducer/user/user";
import DetailOffer from "./detail-offer.connect";
import history from "../../history";
import {Router} from "react-router-dom";
import NameSpace from "../../reducer/name-space";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AppState, SortTypes} from "../../const";
import moment from "moment";

const mockStore = configureStore([]);

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

const noop = () => {};

it(`Render DetailOffer`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      hotels: HOTELS,
      appState: AppState.READY,
    },
    [NameSpace.APP]: {
      city: `Amsterdam`,
      activeOffer: null,
      currentOffer: HOTELS[0].id,
      reviews: REVIEWS,
      nearbyOffers: HOTELS,
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: {},
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <DetailOffer
            onBookmarkClick={noop}
            onHeaderClick={noop}
            postReview={noop}
            clearReviewLoadingStatus={noop}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
          />
        </Router>
      </Provider>, {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }).toJSON;

  expect(tree).toMatchSnapshot();
});
