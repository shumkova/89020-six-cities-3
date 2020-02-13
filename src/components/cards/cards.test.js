import React from "react";
import renderer from 'react-test-renderer';
import Cards from "./cards";

const rentalOffers = [`Wood and stone place`];

it(`Render Cards`, () => {
  const tree = renderer
    .create(
        <Cards
          rentalOffers={rentalOffers}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
