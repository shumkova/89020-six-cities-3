import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer";
import thunk from "redux-thunk";
import {createApi} from "./api";
import {Operation as Operation} from "./reducer/operation";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";

import App from "./components/app/app.connect";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createApi(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(Operation.loadHotels());
store.dispatch(UserOperation.checkAuth());
store.dispatch(Operation.loadFavorites());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);


