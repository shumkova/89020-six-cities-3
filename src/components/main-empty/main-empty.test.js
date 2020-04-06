import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty";

it(`Render FavoritesEmpty`, () => {
  const tree = renderer.create(
      <MainEmpty city={`Amsterdam`}/>
  );

  expect(tree).toMatchSnapshot();
});
