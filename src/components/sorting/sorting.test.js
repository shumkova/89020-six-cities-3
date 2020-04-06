import React from "react";
import renderer from "react-test-renderer";
import Sorting from "./sorting";
import {SortTypes} from "../../const";

it(`Render Sorting`, () => {
  const tree = renderer.create(
      <Sorting
        sortBy={SortTypes.POPULAR}
        setSortingType={() => {}}
        isActive={false}
        onToggleClick={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
