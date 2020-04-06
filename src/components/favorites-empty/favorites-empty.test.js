import React from "react";
import renderer from "react-test-renderer";
import FavoritesEmpty from "./favorites-empty";

it(`Render FavoritesEmpty`, () => {
  const tree = renderer.create(
      <FavoritesEmpty/>
  );

  expect(tree).toMatchSnapshot();
});
