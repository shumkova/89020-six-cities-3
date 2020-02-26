import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

const offers = [{
  img: `img/apartment-01.jpg`,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  type: `Appartment`,
  point: [52.3909553943508, 4.85309666406198],
}];

it(`Render App`, () => {
  const tree = renderer
    .create(
        <App
          placesFound={312}
          offers={offers}
        />, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
