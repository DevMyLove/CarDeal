import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper/bundle";

function FeatureSect() {
  const [featureItem, setFeatureItem] = useState([]);
  const data = [
    {
      src: "https://www.mioto.vn/static/media/features-2.b132c16e.jpg",
      alt: "feature 1",
    },
    {
      src: "https://www.mioto.vn/static/media/features-5.6d62e376.jpg",
      alt: "feature 2",
    },
    {
      src: "https://www.mioto.vn/static/media/features-6.683ce1e0.jpg",
      alt: "feature 3",
    },
    {
      src: "https://www.mioto.vn/static/media/features-4.c499646d.jpg",
      alt: "feature 4",
    },
    {
      src: "https://www.mioto.vn/static/media/features-1.ea53dc74.jpg",
      alt: "feature 5",
    },
    {
      src: "https://www.mioto.vn/static/media/features-1.ea53dc74.jpg",
      alt: "feature 6",
    },
  ];
  const swiper = useRef(null);
  var swiperC = null;
  useEffect(() => {
    setFeatureItem(data);
    swiperC = new Swiper(swiper.current, {
      // Install modules
      slidesPerView: 3.5,
      spaceBetween: 15,
      threshold: 15,
      speed: 400,
      navigation: {
        nextEl: ".next-ft",
        prevEl: ".prev-ft",
      },
      loop: false,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      preventClicks: false,
      preventClicksPropagation: false,
    });
  }, []);
  return (
    <>
      <div className="features__sect has-insurance">
          <h3 className="title-car">Tính năng nổi bật</h3>
        <div className="m-container">
          <div className="swiper-button-next next-ft">
            <i className="bi bi-chevron-right"></i>
          </div>
          <div className="swiper-button-prev prev-ft">
            <i className="bi bi-chevron-left"></i>
          </div>
          <div ref={swiper} className="swiper-container swiper-features swiper-container-horizontal">
            <div className="swiper-wrapper feature-item">
              {featureItem.map((item, index) => (
                <div key={index} className="swiper-slide feature-img">
                  <div className="fix-img">
                    <img src={item.src} alt={item.alt} />
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

export default React.memo(FeatureSect);
