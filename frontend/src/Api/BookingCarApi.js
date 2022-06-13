import axiosClient from "./AxiosClient";

class BookingCar {
  bookCarId(dataCar) {
    let token = JSON.parse(localStorage.getItem("accessToken"));
    var config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    };
    var url = "Cars/booking-car";
    return axiosClient.post(url, dataCar, config);
  }
}
export default new BookingCar();
