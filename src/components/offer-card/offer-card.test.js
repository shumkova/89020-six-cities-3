import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card";

const offer = {
  img: `img/apartment-01.jpg`,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  type: `Appartment`,
};

const handleOfferHover = () => {};

it(`Render OfferCard`, () => {
  const tree = renderer.create(
      <OfferCard
        offer={offer}
        onCardHover={handleOfferHover}
      />
  ).toJSON;

  expect(tree).toMatchSnapshot();
});
