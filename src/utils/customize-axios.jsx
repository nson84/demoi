import axios from "axios";
const BaseURL = import.meta.env.VITE_Localhost;
const instance = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};
const Callrefreshtoken = async () => {
  const res = await instance.get("/api/v1/auth/refresh");
  console.log("check res", res);
  if (res && res.data) {
    return res.data.access_token;
  } else null;
};
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
const NO_RETRY_HEADER = "x-no-retry";

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response && response?.data ? response.data : response;
  },
  async function (error) {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await Callrefreshtoken();
      error.config.headers[NO_RETRY_HEADER] = "true";
      if (access_token) {
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("access_token", access_token);
        return instance.request(error.config);
      }
    }
    // if (
    //   error.config &&
    //   error.response &&
    //   +error.response.status === 400 &&
    //   error.config.url === "/api/v1/auth/refresh"
    // ) {
    //   window.location.href = "/login";
    // }
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/api/v1/auth/refresh"
    ) {
      window.location.href = "/login";
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);
export default instance;
