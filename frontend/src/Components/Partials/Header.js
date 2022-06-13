import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoBrand from "../../Assets/Images/logo.png";
import defaultAvatar from "../../Assets/Images/default-avatar.png";
import clsx from "clsx";
import { AuthContext } from "../../Context/AuthContext";
function Header() {
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isClick, setIsClick] = useState(false);
  const { state: stateLogin, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setLogged(true);
    }
  }, [isLogged, stateLogin.isAuthenticated]);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    setIsClick(false);
    setUser(null);
    setLogged(false);
  };
  return (
    <>
      <div className="wrap-header">
        <div className="header-container">
          <div className="logo-container">
            <Link to="/#" className="logo link text-decoration-none">
              <img src={logoBrand} alt="" />
              <h2>CARDEAL</h2>
            </Link>
          </div>
          <div className="drop-menu">
            <div className="drop-option">
              <Link to="hire-car">Thuê xe</Link>
            </div>
            <div className="drop-option">
              <Link to="create-car">Đăng ký cho thuê xe</Link>
            </div>
          </div>
          <div className="usermenu">
            <div className="optional-item">
              <Link to="" className="link text-decoration-none">
                Hỗ trợ
              </Link>
            </div>
            {!isLogged && (
              <div className="optional-item">
                <Link to="/register" className="link text-decoration-none">
                  Đăng ký
                </Link>
              </div>
            )}

            <div className="optional-item">
              {isLogged ? (
                <div
                  className={clsx("drop-user", { "is-active": isClick })}
                  onClick={handleClick}
                >
                  <div className="drop-btn">
                    <div className="avatar">
                      <img src={user.avatar ? user.avatar : defaultAvatar} />
                      <span>{user.username}</span>
                    </div>
                  </div>
                  <div className="drop-item">
                    <ul>
                      <li>
                        <Link to="">Tài khoản</Link>
                      </li>
                      <li>
                        <Link to="">Xe của tôi</Link>
                      </li>
                      <li>
                        <Link to="">Chuyến của tôi</Link>
                      </li>
                      <li>
                        <button
                          style={{ border: "none", background: "transparent" }}
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <button id="to-login-form" className="btn">
                  <Link to="/login" className="link text-decoration-none">
                    Đăng nhập
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
