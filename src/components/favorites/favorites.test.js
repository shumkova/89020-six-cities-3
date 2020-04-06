import React from "react";
import renderer from "react-test-renderer";
import Favorites from "./favorites";
import {AuthorizationStatus} from "../../reducer/user/user";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history";

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

const noop = () => {};

describe(`Render Favorites`, () => {
  it(`Render Favorites with list`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        authInfo: {},
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Favorites
              favorites={HOTELS}
              onHeaderClick={noop}
              onBookmarkClick={noop}
              authorizationStatus={AuthorizationStatus.AUTH}
            />
          </Router>
        </Provider>
    );

    expect(tree).toMatchSnapshot();
  });

  it(`Render Favorites without list`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        authInfo: {},
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Favorites
              favorites={[]}
              onHeaderClick={noop}
              onBookmarkClick={noop}
              authorizationStatus={AuthorizationStatus.AUTH}
            />
          </Router>
        </Provider>
    );

    expect(tree).toMatchSnapshot();
  });
});
