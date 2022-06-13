import axiosClient from "./AxiosClient";

var versionAPI = 1;

class Location {
  getProvinces = () => {
    let config = {
      headers: {
        accept: "*/*",
      },
    };
    const url = `/Location/provinces`;
    return axiosClient.get(url, config);
  };

  getAllDistricts = () => {
    let config = {
      headers: {
        accept: "*/*",
      },
    };
    const url = `/Location/districts`;
    return axiosClient.get(url, config);
  };

  getDistrictByProvince = (id) => {
    let config = {
      headers: {
        accept: "*/*",
      },
      params: {
        province_id: `${id}`,
      },
    };
    const url = `/Location/district-by-province`;
    return axiosClient.get(url, config);
  };

  getWardByDistric = (id) => {
    let config = {
      headers: {
        accept: "*/*",
      },
      params: {
        district_id: `${id}`,
      },
    };
    const url = `/Location/ward-by-distric`;
    return axiosClient.get(url, config);
  };

  getWardByProvince = (id) => {
    let config = {
      headers: {
        accept: "*/*",
      },
      params: {
        province_id: `${id}`,
      },
    };
    const url = `/Location/ward-by-province`;
    return axiosClient.get(url, config);
  };
}

export default new Location();
