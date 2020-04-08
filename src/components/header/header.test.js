import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Router} from "react-router-dom";
import history from "../../history";

const AUTH_INFO = {
  avatar: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 1,
  isPro: false,
  name: `Oliver.conner`
};

describe(`Header should render properly`, () => {
  it(`Header with Log In`, () => {

    const tree = renderer.create(
        <Router history={history}>
          <Header
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            authInfo={{}}
          />
        </Router>

    ).toJSON;

    expect(tree).toMatchSnapshot();
  });

  it(`Header with email`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Header
            authorizationStatus={AuthorizationStatus.AUTH}
            authInfo={AUTH_INFO}
          />
        </Router>
    ).toJSON;

    expect(tree).toMatchSnapshot();
  });
});
