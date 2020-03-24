import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";
import {AuthorizationStatus} from "../../reducer/user/user";

const userData = {
  avatar: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 1,
  isPro: false,
  name: `Oliver.conner`
};

describe(`Header should render properly`, () => {
  it(`Header with Log In`, () => {
    const tree = renderer.create(
        <Header
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          userData={userData}
        />
    ).toJSON;

    expect(tree).toMatchSnapshot();
  });

  it(`Header with email`, () => {
    const tree = renderer.create(
        <Header
          authorizationStatus={AuthorizationStatus.AUTH}
          userData={userData}
        />
    ).toJSON;

    expect(tree).toMatchSnapshot();
  });
});
