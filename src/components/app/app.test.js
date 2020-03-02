import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app";

const mockStore = configureStore([]);

const OFFERS = [{
  img: `img/apartment-01.jpg`,
  title: `Beautiful & luxurious apartment at great location`,
  price: 120,
  type: `Appartment`,
  point: [52.3909553943508, 4.85309666406198],
  city: `Amsterdam`,
}];

it(`Render App`, () => {
  const store = mockStore({
    city: `Amsterdam`,
    offers: OFFERS,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            onCityClick={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
