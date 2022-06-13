import Moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import DisplayCarApi from "../../Api/DisplayCarApi";
import defaultImageSrc from "../../Assets/Images/defaultCar.png";
import Swiper from "swiper/bundle";
import BookingCarApi from "../../Api/BookingCarApi";

function BookingCar() {
  const currentDate = Moment(new Date()).format("YYYY-MM-DD");

  const [dataCar, setDataCar] = useState(null);
  const swiperCar = useRef(null);
  const query = new URLSearchParams(window.location.search);
  const carId = query.get("id");

  useEffect(() => {
    new Swiper(swiperCar.current, {
      // Install modules
      slidesPerView: 1,
      spaceBetween: 15,
      threshold: 15,
      speed: 400,
      navigation: {
        nextEl: ".next-img",
        prevEl: ".prev-img",
      },
      loop: false,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      preventClicks: false,
      preventClicksPropagation: false,
    });

    (async () => {
      try {
        let res = await DisplayCarApi.InfoCar(carId);
        if (res.success) {
          setDataCar(res.data);
          console.log(res.data);
        } else {
          throw new Error("failed");
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {};
  }, []);

  const bookingTimes = [];
  for (var i = 0; i < 1440; i = i + 30) {
    const time = i;
    const hour = (time - (time % 60)) / 60;
    const hourLabel = hour < 10 ? `0${hour}` : `${hour}`;
    const min = time % 60;
    const minLabel = min < 10 ? `0${min}` : `${min}`;
    bookingTimes.push({ value: time, label: `${hourLabel}:${minLabel}` });
  }

  const [stateTime, setStateTime] = useState({
    startTime: 1020,
    endTime: 1020 + 180,
  });
  const [stateDate, setStateDate] = useState({
    dateStart: Moment(new Date()).format("YYYY-MM-DD"),
    dateEnd: Moment(new Date(new Date().valueOf() + 86400000)).format(
      "YYYY-MM-DD"
    ),
  });

  const onStartTimeChange = (e) => {
    if (stateDate.dateEnd > stateDate.dateStart) {
      setStateTime({ ...stateTime, startTime: Number(e.target.value) });
    } else {
      if (Number(e.target.value) >= Number(stateTime.endTime) - 180) {
        setStateTime({
          startTime: Number(e.target.value),
          endTime: Number(e.target.value) + 180,
        });
      } else {
        setStateTime({ ...stateTime, startTime: Number(e.target.value) });
      }
    }
  };

  const onEndTimeChange = (e) => {
    if (stateDate.dateEnd > stateDate.dateStart) {
      setStateTime({ ...stateTime, endTime: Number(e.target.value) });
    } else {
      if (Number(e.target.value) >= stateTime.startTime + 180) {
        setStateTime({ ...stateTime, endTime: Number(e.target.value) });
      }
    }
  };
  const onChangeDateStart = (e) => {
    if (e.target.value >= stateDate.dateEnd) {
      setStateDate({
        dateStart: e.target.value,
        dateEnd: e.target.value,
      });
      setStateTime({ ...stateTime, endTime: stateTime.startTime + 180 });
    } else {
      setStateDate({
        ...stateDate,
        dateStart: e.target.value,
      });
    }
  };
  const onChangeDateEnd = (e) => {
    if (e.target.value > stateDate.dateStart) {
      setStateDate({ ...stateDate, dateEnd: e.target.value });
    } else if (e.target.value == stateDate.dateStart) {
      setStateDate({ ...stateDate, dateEnd: e.target.value });
      setStateTime({ ...stateTime, endTime: stateTime.startTime + 180 });
    }
  };

  const convertTime = (time) => {
    let x = time / 30 / 2;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let startDateTime = new Date(
      stateDate.dateStart + " " + bookingTimes[stateTime.startTime / 30].label
    );

    let endDateTime = new Date(
      stateDate.dateEnd + " " + bookingTimes[stateTime.endTime / 30].label
    );

    let dataPost = {
      car_id: Number(carId),
      startBooking: startDateTime,
      endBooking: endDateTime,
    };

    console.log(JSON.stringify(dataPost));
    (async () => {
      let res = await BookingCarApi.bookCarId(JSON.stringify(dataPost));
      console.log(res);
    })();

    // console.log(bookingTimes[x].label);
    // console.log(endDateTime);
  };

  function currencyFormat(num) {
    return (
      Number(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ"
    );
  }
  return (
    <>
      <div className="booking-container">
        <div className="content-detail">
          <div className="info-car slide-box">
            <div className="m-container">
              <div className="swiper-button-next next-img">
                <i className="bi bi-chevron-compact-right" />
              </div>
              <div className="swiper-button-prev prev-img">
                <i className="bi bi-chevron-compact-left" />
              </div>
              <div ref={swiperCar} className="swiper-container swiper-car">
                <div className="swiper-wrapper car-item">
                  {dataCar &&
                    dataCar.images.map((item, index) => (
                      <div key={`sll_${index}`} className="swiper-slide">
                        <div key={index} className="fix-img">
                          <img
                            src={item ? item.url : defaultImageSrc}
                            alt={item.name}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="info-car"></div>
          <div className="info-car"></div>
          <div className="info-car"></div>
        </div>
        <div className="rent-box ">
          <div className="price-car">
            {dataCar && <h3>{dataCar.price / 1000}K/ngày</h3>}
          </div>
          <div className="choose-date date-start">
            <label>Ngày bắt đầu</label>
            <div className="wrap-input date">
              <input
                type="date"
                value={stateDate.dateStart}
                onChange={onChangeDateStart}
              />
            </div>
            <div className="wrap-input time">
              <select onChange={onStartTimeChange} value={stateTime.startTime}>
                {bookingTimes.map((time) => (
                  <option key={`s_${time.value}`} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="choose-date date-end">
            <label>Ngày kết thúc</label>
            <div className="wrap-input date">
              <input
                type="date"
                value={stateDate.dateEnd}
                onChange={onChangeDateEnd}
              />
            </div>
            <div className="wrap-input time">
              <select onChange={onEndTimeChange} value={stateTime.endTime}>
                {bookingTimes.map((time) => (
                  <option key={`e_${time.value}`} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="location">
            <p>Địa điểm nhận xe: </p>
            <i className="bi bi-geo-alt">{dataCar && dataCar.address}</i>
          </div>
          <div className="calculation-price ">
            <h3>Chi tiết giá</h3>
            <div className="price-basic d-flex justify-content-between">
              <p>Đơn giá thuê</p>
              <p>{dataCar && currencyFormat(dataCar.price)}</p>
            </div>
            <p style={{ textAlign: "end" }}>x</p>
            <div className="total-time d-flex justify-content-between">
              <p>Thời gian</p>
              <p>{} ngày</p>
            </div>
            <div className="total-all d-flex justify-content-between border-top border-primary pt-2">
              <p>Tổng cộng</p>
              <p>{dataCar && currencyFormat(dataCar.price * 3)}</p>
            </div>
          </div>

          <div className="wrap-btn ">
            <button className="btn btn-success" onClick={handleSubmit}>
              Đặt xe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BookingCar;
