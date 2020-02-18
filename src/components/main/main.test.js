import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const offers = [{
  img: `img/apartment-01.jpg`,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  type: `Appartment`,
}];

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          placesFound={312}
          offers={offers}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
