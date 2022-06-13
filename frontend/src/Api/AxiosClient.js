import axios from "axios";
import queryString from "query-string";

var versionAPI = 1;

const axiosClient = axios.create({
  baseURL: `http://tienns1-001-site1.ftempurl.com/api/v${versionAPI}`,
  headers: {
    accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
