
import axiosClient from "./AxiosClient";

class RegisterUser {
  
  postUser = (data) => {
    let config = {
      headers: {
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryzuW5nPZQFQCwQtg4",
      }
    }

    const url = "AppUsers/Registration";
    return axiosClient.post(url,data,config);
  }
}
export default new RegisterUser();
