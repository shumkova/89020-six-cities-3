import React from "react";
import renderer from 'react-test-renderer';
import App from './app';

const rentalOffers = [`Wood and stone place`];

it(`Render App`, () => {
  const tree = renderer
    .create(
        <App
          rentalOffersCount={312}
          rentalOffers={rentalOffers}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
