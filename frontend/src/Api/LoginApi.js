import axiosClient from "./AxiosClient";

class LoginUser {
  postUser = (data) => {
    let config = {
      headers: {
        "Content-Type": "application/ld+json",
      },
    };

    const url = `/Token`;
    return axiosClient.post(url, data, config);
  };

  getUser = (token) => {
    let config = {
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    };
    const url = "/AppUsers/Info";
    return axiosClient.get(url, config);
  };
}

export default new LoginUser();
