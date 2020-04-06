import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form";

it(`Render ReviewForm`, () => {
  const tree = renderer.create(
      <ReviewForm
        onSubmit={() => {}}
        id={1}
        loadingStatus={``}
        clearReviewLoadingStatus={() => {}}
      />
  );

  expect(tree).toMatchSnapshot();
});
