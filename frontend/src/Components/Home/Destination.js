import React, { useState, useEffect, useRef } from "react";
import Swiper from "swiper/bundle";

function Destination() {
  const [destinationItem, setDestinationItem] = useState([]);
  const data = [
    {
      src: "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities/HoChiMinh_v2.jpg",
      alt: "destination 1",
      city: "TP.HCM",
      slx: 2000,
    },
    {
      src: "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities/HaNoi_v2.jpg",
      alt: "destination 2",
      city: "Hà Nội",
      slx: 1500,
    },
    {
      src: "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities/DaNang_v2.jpg",
      alt: "destination 3",
      city: "Đà Nẵng",
      slx: 800,
    },
    {
      src: "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities/BinhDuong_v2.jpg",
      alt: "destination 4",
      city: "Bình Dương",
      slx: 500,
    },
    {
      src: "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities/CanTho_v2.jpg",
      alt: "destination 5",
      city: "Cần Thơ",
      slx: 400,
    },
    {
      src: "https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities/DaLat_v2.jpg",
      alt: "destination 6",
      city: "Đà Lạt",
      slx: 600,
    },
  ];
  const swiper1 = useRef(null);
  var swiperC = null;
  useEffect(() => {
    setDestinationItem(data);
    swiperC = new Swiper(swiper1.current, {
      slidesPerView: 5,
      spaceBetween: 15,
      threshold: 15,
      speed: 400,
      navigation: {
        nextEl: ".next-dest",
        prevEl: ".prev-dest",
      },
      loop: false,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      preventClicks: false,
      preventClicksPropagation: false,
    });
  }, []);

  return (
    <div className="destination__sect has-insurance">
        <h3 className="title-car">Địa Điểm nổi bật</h3>
      <div className="m-container">
        <div className="swiper-button-next next-dest">
          <i className="bi bi-chevron-compact-right"></i>
        </div>
        <div className="swiper-button-prev prev-dest">
          <i className="bi bi-chevron-compact-left"></i>
        </div>
        <div ref={swiper1} className="swiper-container swiper-destination swiper-container-horizontal">
          <div className="swiper-wrapper destination-item">
            {destinationItem.map((item, index) => (
              <div key={index} className="swiper-slide destination-img">
                <div className="fix-img">
                  <img src={item.src} alt={item.alt} />
                  <h3>
                    {item.city}
                    <span>{item.slx}+ xe</span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Destination);
