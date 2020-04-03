import {extend} from "../../utils";
import EditAuthInfo from "../../adapters/edit-auth-info";
import {AppRoute} from "../../const";
import history from "../../history";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {},
};

const ActionTypes = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_INFO: `SET_INFO`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionTypes.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  setUser: (data) => {
    return {
      type: ActionTypes.SET_INFO,
      payload: data,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionTypes.SET_INFO:
      return extend(state, {
        authInfo: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUser(EditAuthInfo.parseUser(response.data)));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        const user = EditAuthInfo.parseUser(response.data);
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUser(user));
        history.push(AppRoute.ROOT);
      });
  }
};

export {
  ActionCreator,
  ActionTypes,
  AuthorizationStatus,
  Operation,
  reducer,
};
