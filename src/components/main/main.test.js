import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const places = [`Wood and stone place`];

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          placesFound={312}
          places={places}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
