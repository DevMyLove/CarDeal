import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ResetPassword from "./Components/Auth/ResetPassword";
import VerifyUser from "./Components/Auth/VerifyUser";
import BookingCar from "./Components/Cars/BookingCar";
import CreateCar from "./Components/Cars/CreateCar";
import CreateCarTam from "./Components/Cars/CreateCarTam";
import HireCar from "./Components/Cars/HireCar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Partials/Footer";
import Header from "./Components/Partials/Header";
import NoMatch from "./Components/Site/NoMatch";
import "./Styles/_main.scss";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="men" element={<Register />} />
            <Route path="women" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="create-car" element={<CreateCar />} /> */}
            <Route path="create-car" element={<CreateCarTam />} />
            <Route path="booking/car" element={<BookingCar />}>
              <Route index element={<NoMatch />} />
              <Route path="login" element={<Login />}></Route>
            </Route>
            <Route path="hire-car" element={<HireCar />} />
            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="auth" element={<VerifyUser />}>
              <Route index element={<NoMatch />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}
export default App;
