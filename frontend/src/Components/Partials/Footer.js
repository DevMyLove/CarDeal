import React from "react";
import { Link } from "react-router-dom";
import * as ReactIcons from "react-icons/fa";
// import 'bootstrap/dist/css/bootstrap.min.css';
function Footer() {
  return (
    <footer id="footer" className="bg-dark text-center text-white">
      <div className="container p-4">
        <section className="mb-4" >
          <Link
            className="btn btn-outline-light btn-floating m-1"
            to="#!"
            role="button"
          >
            <ReactIcons.FaFacebook className="fab fa-facebook-f" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-1"
            to="#!"
            role="button"
          >
            <ReactIcons.FaTwitter className="fab fa-twitter" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-1"
            to="#!"
            role="button"
          >
            <ReactIcons.FaGoogle className="fab fa-google" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-1"
            to="#!"
            role="button"
          >
            <ReactIcons.FaInstagram className="fab fa-instagram" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-1"
            to="#!"
            role="button"
          >
            <ReactIcons.FaLinkedinIn className="fab fa-linkedin-in" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-1"
            to="#!"
            role="button"
          >
            <ReactIcons.FaGithub className="fab fa-github" />
          </Link>
        </section>

        <section className="">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Chinh sách</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="#!" className="text-white">
                    Giới thiệu về CarDeal
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Chính sách và quy định
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Quy chế hoạt động
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Bảo mật thông tin
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Tìm hiểu thêm</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="#!" className="text-white">
                    Hướng dẫn chung
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Hướng dẫn đặt xe
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Hướng dẫn dành cho chủ xe
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Hướng dẫn thanh toán
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Đối tác </h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="#!" className="text-white">
                    Đăng ký chủ xe CarDeal
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Đăng ký GPS MI-TRACK 1.0
                  </Link>
                </li>
                <li>
                  <Link to="#!" className="text-white">
                    Đăng ký Bảo hiểm vật chất & Bảo hiểm TNDS xe ô tô
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
      </div>
    </footer>
  );
}

export default Footer;
