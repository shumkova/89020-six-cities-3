import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer/reducer";
import App from "./components/app/app.jsx";
import offers from "./mocks/offers";

const Settings = {
  RENTAL_OFFERS_COUNT: 312
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        placesFound={Settings.RENTAL_OFFERS_COUNT}
        offers={offers}
      />
    </Provider>,
    document.querySelector(`#root`)
);
