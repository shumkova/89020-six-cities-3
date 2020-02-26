import React from "react";
import renderer from "react-test-renderer";
import Map from "./map";

const coordinates = [
  [52.3909553943508, 4.85309666406198],
  [52.369553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198],
];

const cityCords = [52.38333, 4.9];

it(`Map should render correctly`, () => {
  const tree = renderer.create(
      <Map
        cityCords={cityCords}
        coordinates={coordinates}
      />, {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
