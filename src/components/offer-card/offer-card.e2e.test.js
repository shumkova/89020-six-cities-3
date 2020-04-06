import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from "./offer-card";
import {AuthorizationStatus} from "../../reducer/user/user";
import {ListTypes} from "../../const";

Enzyme.configure({adapter: new Adapter()});

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

it(`On card hover active card is sent to callback`, () => {
  const onCardHover = jest.fn();
  const onHeaderClick = jest.fn();
  const onBookmarkClick = jest.fn();

  const card = shallow(<OfferCard
    offer={OFFER}
    onCardHover={onCardHover}
    onHeaderClick={onHeaderClick}
    onBookmarkClick={onBookmarkClick}
    authorizationStatus={AuthorizationStatus.AUTH}
    cardType={ListTypes.CITY.card}
  />);

  card.simulate(`mouseenter`);
  expect(onCardHover).toHaveBeenCalledTimes(1);
  expect(onCardHover).toHaveBeenCalledWith(OFFER.id);
});

it(`Offer name should be pressed`, () => {
  const onCardHover = jest.fn();
  const onHeaderClick = jest.fn();
  const onBookmarkClick = jest.fn();
  const mockedEvent = { preventDefault: () => {} };

  const card = shallow(<OfferCard
    offer={OFFER}
    onCardHover={onCardHover}
    onHeaderClick={onHeaderClick}
    onBookmarkClick={onBookmarkClick}
    authorizationStatus={AuthorizationStatus.AUTH}
    cardType={ListTypes.CITY.card}
  />);

  const offerName = card.find(`.place-card__name-link`);
  offerName.props().onClick(mockedEvent);
  expect(onHeaderClick.mock.calls.length).toBe(1);
});

it(`Card bookmark should be pressed`, () => {
  const onCardHover = jest.fn();
  const onHeaderClick = jest.fn();
  const onBookmarkClick = jest.fn();

  const card = shallow(
      <OfferCard
        offer={OFFER}
        onCardHover={onCardHover}
        onHeaderClick={onHeaderClick}
        onBookmarkClick={onBookmarkClick}
        authorizationStatus={AuthorizationStatus.AUTH}
        cardType={ListTypes.CITY.card}
      />
  );

  const bookmark = card.find(`.place-card__bookmark-button`);
  bookmark.props().onClick();
  expect(onBookmarkClick.mock.calls.length).toBe(1);
});
