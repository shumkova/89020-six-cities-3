import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from "./offer-card";

Enzyme.configure({adapter: new Adapter()});

const offer = {
  img: `img/apartment-01.jpg`,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  type: `Appartment`,
};

it(`On card hover active card is sent to callback`, () => {
  const onCardHover = jest.fn();

  const card = shallow(<OfferCard
    offer={offer}
    onCardHover={onCardHover}
  />);

  card.simulate(`mouseover`);

  expect(onCardHover).toHaveBeenCalledTimes(1);

  expect(onCardHover.mock.calls[0][0]).toMatchObject(offer);
});
