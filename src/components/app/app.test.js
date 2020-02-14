import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

const places = [`Wood and stone place`];

it(`Render App`, () => {
  const tree = renderer
      .create(
          <App
            placesFound={312}
            places={places}
          />
      ).toJSON();

  expect(tree).toMatchSnapshot();
});
