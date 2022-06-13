import axiosClient from "./AxiosClient";

class DisplayCar {
  ListCar(currentPage) {
    let limit = 9;
    var config = {
      headers: {},
      params: {
        pageIndex: `${currentPage}`,
        limit: `${limit}`,
      },
    };
    var url = "Cars/cars";

    return axiosClient.get(url, config);
  }
  
  Filter(currentPage) {
    let limit = 9;
    var config = {
      headers: {},
      params: {
        province_id: "",
        district_id: "",
        ward_id: "",
        start_booking: "",
        pageIndex: `${currentPage}`,
        limit: `${limit}`,
      },
    };
    var url = "Cars/cars-by-param";

    return axiosClient.get(url, config);
  }

  InfoCar(id) {
    var config = {
      headers: {},
      params: {
        id: `${id}`,
      },
    };
    var url = "Cars/car";

    return axiosClient.get(url, config);
  }
}
export default new DisplayCar();
