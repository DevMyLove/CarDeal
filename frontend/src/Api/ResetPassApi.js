
import axiosClient from "./AxiosClient";

class ResetPassUser {
  
  postUser = (data) => {
    let config = {
      headers: {
        "Content-Type": "application/ld+json",
      },
      params:{
        username: data.UserName
      }
    }
    const url = "AppUsers/ResetPassword";
    return axiosClient.put(url,null,config);
  }
}
export default new ResetPassUser();
