import React from "react";
import { Link } from "react-router-dom";
import defaultImageSrc from "../../Assets/Images/defaultCar.png";
import { useNavigate, useSearchParams } from "react-router-dom";

var arrAddress = null;

function CardCar({ item }) {
  let navigate = useNavigate();

  const handleClickBookCar = (e) => {
    e.preventDefault();
    console.info(item.id);
    navigate(`/booking/car?id=${item.id}`);
  };
  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " đ";
  }
  return (
    <>
      <div className="card-box">
        <Link to={"/"} className="" title={item.name}>
          <div className="img-card">
            <div className="fix-img">
              <img
                src={item.images[0] ? item.images[0].url : defaultImageSrc}
                alt="{item.name}"
              />
            </div>
          </div>
          <div className="desc-car">
            <h3>{item.name}</h3>
            <div className="group-label">
              {item.details.map(
                (element, index) =>
                  (element.id == 42 || element.id == 43) && (
                    <span key={index}>{element.val}</span>
                  )
              )}
            </div>
            <div className="location">
              <p>
                <i className="bi bi-geo-alt">
                  {item.address != "" &&
                    ((arrAddress = item.address.split(",")),
                    (
                      <span>
                        {arrAddress[arrAddress.length - 2] +
                          ", " +
                          arrAddress[arrAddress.length - 1]}
                      </span>
                    ))}
                </i>
              </p>
            </div>
            <div className="price">
              <span>{currencyFormat(item.price)}</span>
            </div>
          </div>
        </Link>
        <div className="btn-booking">
          <button className="btn btn-secondary" onClick={handleClickBookCar}>
            Đặt xe
          </button>
        </div>
      </div>
    </>
  );
}
export default CardCar;
