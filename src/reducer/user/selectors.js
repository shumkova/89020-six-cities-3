import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;


const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

const getAuthInfo = (state) => {
  return state[NAME_SPACE].authInfo;
};

export {getAuthorizationStatus, getAuthInfo};

