import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

const offers = [{
  img: `img/apartment-01.jpg`,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  type: `Appartment`,
}];

it(`Render App`, () => {
  const tree = renderer
      .create(
          <App
            placesFound={312}
            offers={offers}
          />
      ).toJSON();

  expect(tree).toMatchSnapshot();
});
