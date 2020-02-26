import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const offers = [{
  img: `img/apartment-01.jpg`,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  type: `Appartment`,
  point: [52.3909553943508, 4.85309666406198],
}];

const cityCords = [52.38333, 4.9];

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          placesFound={312}
          offers={offers}
          onHeaderClick={() => {}}
          cityCords={cityCords}
        />, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
