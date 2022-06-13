import axiosClient from "./AxiosClient";

class CreateCar {
  getAll = (token) => {
    let config = {
      headers: {},
      params: {
        // code: "",
      },
    };
    const url = "Detail";
  };

  getLX = (token) => {
    let config = {
      headers: {},
      params: {
        code: "LOAIXE",
      },
    };
    const url = "Detail";
    return axiosClient.get(url, config);
  };

  getTD = (token) => {
    let config = {
      headers: {},
      params: {
        code: "TRUYENDONG",
      },
    };
    const url = "Detail";
    return axiosClient.get(url, config);
  };

  getNL = (token) => {
    let config = {
      headers: {},
      params: {
        code: "NHIENLIEU",
      },
    };
    const url = "Detail";
    return axiosClient.get(url, config);
  };

  getMTT = (token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        code: "MTT",
      },
    };
    const url = "Detail";
    return axiosClient.get(url, config);
  };

  getTN = (token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        code: "TINHNANG",
      },
    };
    const url = "Detail";
    return axiosClient.get(url, config);
  };

  getGTTX = (token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        code: "GIAYTOTHUEXE",
      },
    };
    const url = "Detail";
    return axiosClient.get(url, config);
  };

  getBrands = (token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = "Brands";
    return axiosClient.get(url, config);
  };

  postNewBrand = (data) => {
    let token = JSON.parse(localStorage.getItem("accessToken"));
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    };
    const url = "Brands";
    return axiosClient.post(url, data, config);
  };

  postNewCar = (data) => {
    let token = localStorage.getItem("accessToken");
    let config = {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundaryzuW5nPZQFQCwQtg4",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = "Cars";
    return axiosClient.post(url, data, config);
  };
}
export default new CreateCar();
