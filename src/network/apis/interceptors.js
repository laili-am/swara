import { getToken } from "../../utils/Auth";

export const isHandlerEnabled = (config) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

export const requestHandler = (config) => {
  if (isHandlerEnabled(config)) {
    const auth = getToken();
    if (auth) {
      config.headers.Authorization = `Bearer ${auth}`;
    }
  }
  return config;
};

export const successHandler = (response) => {
  if (isHandlerEnabled(response)) {
    if (response.status === 200) {
      return response;
    }
  }
  return response;
};

export const errorHandler = (error) => {
  return Promise.reject({ ...error });
};
