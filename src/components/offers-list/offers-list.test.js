import React from "react";
import renderer from "react-test-renderer";
import OffersList from "./offers-list.connect";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {Router} from "react-router-dom";
import history from "../../history";
import {AuthorizationStatus} from "../../reducer/user/user";
import {ListTypes, SortTypes} from "../../const";

const mockStore = configureStore([]);

const offers = [{
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

const noop = () => {};

it(`Render OffersList`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      hotels: offers,
      applicationIsReady: true,
    },
    [NameSpace.APP]: {
      city: `Amsterdam`,
      activeOffer: null,
      currentOffer: null,
      reviews: [],
      nearbyOffers: [],
      sortType: SortTypes.POPULAR,
      reviewLoadingStatus: ``,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: {},
    }
  });

  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <OffersList
            offers={offers}
            onHeaderClick={noop}
            onBookmarkClick={noop}
            onItemHover={noop}
            listType={ListTypes.CITY}
            setActiveOffer={noop}
          />
        </Provider>
      </Router>

  ).toJSON;

  expect(tree).toMatchSnapshot();
});
