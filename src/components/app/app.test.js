import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import App from "./app";
import {AuthorizationStatus} from "../../reducer/user/user";

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

const cities = [{
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10
  },
  name: `Amsterdam`
}];

const userData = {
  avatar: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 1,
  isPro: false,
  name: `Oliver.conner`
};

const noop = () => {};

it(`App should render everything`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      hotels: HOTELS,
      applicationIsReady: true,
    },
    [NameSpace.APP]: {
      city: `Amsterdam`,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: {},
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            onCityClick={noop}
            login={noop}
            offers={HOTELS}
            changeCity={noop}
            city={`Amsterdam`}
            cities={cities}
            ready={true}
            authorizationStatus={AuthorizationStatus.AUTH}
            userData={userData}
          />
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App should render "pending"`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      hotels: [],
      applicationIsReady: false,
    },
    [NameSpace.APP]: {
      city: `Amsterdam`,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authInfo: {},
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            onCityClick={noop}
            login={noop}
            offers={HOTELS}
            changeCity={noop}
            city={`Amsterdam`}
            cities={cities}
            ready={false}
            authorizationStatus={AuthorizationStatus.AUTH}
            userData={userData}
          />
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
