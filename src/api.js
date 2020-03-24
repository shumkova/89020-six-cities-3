import axios from "axios";

const Errors = {
  UNAUTHORIZED: 401,
};

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Errors.UNAUTHORIZED) {
      onUnauthorized();

      // window.location = `/login`;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
