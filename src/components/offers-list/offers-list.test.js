import React from "react";
import renderer from "react-test-renderer";
import OffersList from "./offers-list";

const offers = [{
  img: `img/apartment-01.jpg`,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  type: `Appartment`,
  city: `Amsterdam`,
}];

it(`Render OffersList`, () => {
  const tree = renderer.create(
      <OffersList
        offers={offers}
        onHeaderClick={() => {}}
        onItemHover={() => {}}
      />
  ).toJSON;

  expect(tree).toMatchSnapshot();
});
