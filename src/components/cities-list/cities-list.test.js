import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list";

const cities = [`Amsterdam`, `Moscow`, `New York`, `London`];
const activeCity = `London`;
const onCityClick = () => {};

it(`CitiesList should render correctly`, () => {
  const tree = renderer.create(
      <CitiesList
        cities={cities}
        activeCity={activeCity}
        onCityClick={onCityClick}
      />
  ).toJSON;

  expect(tree).toMatchSnapshot();
});
