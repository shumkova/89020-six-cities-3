import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Router} from "react-router-dom";
import history from "../../history";
import {ListTypes} from "../../const";

const offer = {
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

const noop = () => {};

it(`Render OfferCard`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <OfferCard
          offer={offer}
          onCardHover={noop}
          onHeaderClick={noop}
          onBookmarkClick={noop}
          authorizationStatus={AuthorizationStatus.AUTH}
          cardType={ListTypes.CITY.card}
        />
      </Router>
  ).toJSON;

  expect(tree).toMatchSnapshot();
});
