import React from "react";
import renderer from "react-test-renderer";
import Map from "./map";

const coordinates = [{
  latitude: 52.35514938496378,
  longitude: 4.673877537499948,
  zoom: 8,
}];

const cityCords = {
  latitude: 52.370216,
  longitude: 4.895168,
  zoom: 10
};

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
