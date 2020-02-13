import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const rentalOffers = [`Wood and stone place`];

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          rentalOffersCount={312}
          rentalOffers={rentalOffers}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
