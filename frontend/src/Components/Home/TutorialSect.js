import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TutorialSect() {
  const data = [
    {
      src: "https://www.mioto.vn/static/media/step-1.640bee37.svg",
      alt: "Đặt xe",
      detail: "Đặt xe với CarDeal",
    },
    {
      src: "https://www.mioto.vn/static/media/step-2.75dbfcf5.svg",
      alt: "Nhận giao xe",
      detail: "Nhận hoặc giao xe tận nơi",
    },
    {
      src: "https://www.mioto.vn/static/media/step-3.055b2c05.svg",
      alt: "Trải nghiệm",
      detail: "Trải nghiệm chuyến đi",
    },
    {
      src: "https://www.mioto.vn/static/media/step-4.6b74a919.svg",
      alt: "Kết thúc",
      detail: "Kết thúc giao dịch",
    },
  ];
  const [tutorialCar, setTutorialCar] = useState([data]);
  //   useEffect(() => {
  //     setTutorialCar(data);
  //   },[]);
  return (
    <>
      <div className="tutorial__sect">
        <div className="ex-container">
          <h3 className="title-car">Hướng dẫn thuê xe</h3>
          <Link to="" className="link-tutorial link-none">
            <div className="step-box__wrap">
              {data.map((item, index) => (
                <div key={index} className="step-box__item">
                  <div className="step-img">
                    <div className="fix-img">
                      <img src={item.src} alt={item.alt} />
                    </div>
                  </div>
                  <div className="step-detail">
                    <h3>{item.detail}</h3>
                  </div>
                </div>
              ))}
            </div>
          </Link>
          <div className="s-all">
            <Link to="" className="link-none">
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(TutorialSect);
