import React, { useEffect, useRef, useState } from "react";
import DisplayCarApi from "../../Api/DisplayCarApi";
import Swiper from "swiper/bundle";
import defaultImageSrc from "../../Assets/Images/defaultCar.png";
import { Link } from "react-router-dom";

function CarAreaSect() {
  // xe tu lai
  const [data1, setData1] = useState([]);

  // Swiper Slide
  const swiper1 = useRef(null);
  const refPage = useRef(1);
  var arrAddress = null;

  // call api lấy data rồi filter xe tự lái & xe có tài xế
  useEffect(() => {
    new Swiper(swiper1.current, {
      // Install modules
      slidesPerView: 3,
      spaceBetween: 15,
      threshold: 15,
      speed: 400,
      navigation: {
        nextEl: ".next-ca",
        prevEl: ".prev-ca",
      },
      loop: false,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      preventClicks: false,
      preventClicksPropagation: false,
    });

    (async () => {
      try {
        let res = await DisplayCarApi.ListCar(refPage.current);
        if (res.success == true) {
          setData1(res.data.items);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {};
  }, []);

  const handleClickBookCar = (e, item) => {
    e.preventDefault();
    console.log(item.id);
  };

  return (
    <>
      {/* Nổi bật - xe tự lái */}
      <div className="car-area__sect has-insurance">
        <h3 className="title-car">Xe nổi bật</h3>
        <div className="m-container">
          <div className="swiper-button-next next-ca">
            <i className="bi bi-chevron-compact-right"></i>
          </div>
          <div className="swiper-button-prev prev-ca">
            <i className="bi bi-chevron-compact-left"></i>
          </div>
          <div ref={swiper1} className="swiper-container swiper-car-area">
            <div className="swiper-wrapper car-area-item">
              {data1.map((item, index) => (
                <div key={index} className="swiper-slide car-area-img">
                  <div className="link-car">
                    <Link to={"/"} className="">
                      <div className="img-car">
                        <div className="fix-img">
                          <img
                            src={
                              item.images[0]
                                ? item.images[0].url
                                : defaultImageSrc
                            }
                            alt={item.name}
                          />
                        </div>
                      </div>
                      <div className="desc-car">
                        <h2>{item.name}</h2>
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
                      </div>
                    </Link>{" "}
                    <div className="button-booking-car">
                      <div
                        className="btn btn-primary"
                        onClick={(e) => handleClickBookCar(e, item)}
                      >
                        Đặt xe
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(CarAreaSect);
