import Moment from "moment";
import { useEffect, useState } from "react";
import LocationApi from "../../Api/LocationApi";
import DisplayCar from "../Cars/DisplayCar";

function HireCar() {
  const [stateFilter, setStateFilter] = useState({
    driver: "TULAI",
    location: {
      province: 1,
      district: 1,
      ward: 1,
    },
    dateStart: Moment(new Date()).format("YYYY-MM-DD"),
    price: 0,
    seat: null,
  });

  const [dataProvinces, setDataProvinces] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [dataWards, setDataWards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let res = await LocationApi.getProvinces();
        if (res.success === true) {
          // console.log(res.data[0].province_id);
          setStateFilter({
            ...stateFilter,
            location: {
              ...stateFilter.location,
              province: res.data[0].province_id,
            },
          });

          setDataProvinces(res.data);
        } else {
          throw new Error(res.message);
        }
      } catch (error) {}
    })();
    return () => {};
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let res = await LocationApi.getDistrictByProvince(
          stateFilter.location.province
        );

        if (res.success === true) {
          // console.log(res.data)
          setStateFilter({
            ...stateFilter,
            location: {
              ...stateFilter.location,
              district: res.data[0].district_id,
            },
          });
          setDataDistricts(res.data);
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {};
  }, [stateFilter.location.province]);

  useEffect(() => {
    (async () => {
      try {
        let res = await LocationApi.getWardByDistric(
          stateFilter.location.district
        );
        if (res.success === true) {
          let arrWard;
          arrWard = res.data.filter(
            (ward) => ward.province_id == stateFilter.location.province
          );
          setStateFilter({
            ...stateFilter,
            location: {
              ...stateFilter.location,
              ward: arrWard[0].ward_id,
            },
          });
          setDataWards(arrWard);
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {};
  }, [stateFilter.location.district]);

  // handle change value filter
  const handleChangeProvince = (e) => {
    setStateFilter({
      ...stateFilter,
      location: { ...stateFilter.location, province: e.target.value },
    });
    // console.log(stateFilter);
  };

  const handleChangeDistrict = (e) => {
    setStateFilter({
      ...stateFilter,
      location: { ...stateFilter.location, district: e.target.value },
    });
    // console.log(stateFilter);
  };

  const handleChangeWard = (e) => {
    setStateFilter({
      ...stateFilter,
      location: { ...stateFilter.location, ward: e.target.value },
    });
  };

  const handleChageDriver = (e) => {
    setStateFilter({ ...stateFilter, driver: e.target.value });
  };

  const handleChangePrice = (e) => {
    setStateFilter({ ...stateFilter, price: e.target.value });
  };

  const handleChangeDate = (e) => {
    setStateFilter({ ...stateFilter, dateStart: e.target.value });
  };

  const handChangeSeat = (e) => {
    console.log(e.target.value);
    setStateFilter({ ...stateFilter, seat: e.target.value });
  };

  const handleSubmitFilter = (e) => {
    e.preventDefault();
  };

  function currencyFormat(num) {
    return (
      Number(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " đ"
    );
  }

  return (
    <>
      <section className="body__sect">
        <div className="filter-container">
          <button
            className="btn btn-info px-4 my-3"
            onClick={handleSubmitFilter}
          >
            <i className="bi bi-funnel me-2" />
            <span>Lọc</span>
          </button>
          <div className="filter-item filter-location">
            <div className="location-option provinces">
              <label>Thành phố, tỉnh</label>
              <select
                className="form-select"
                aria-label="Thành phố, tỉnh"
                onChange={handleChangeProvince}
              >
                {dataProvinces.map((option, index) => (
                  <option key={index} value={option.province_id}>
                    {option.province_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="location-option districts">
              <label>Quận, huyện</label>
              <select
                className="form-select"
                aria-label="Quận, huyện"
                onChange={handleChangeDistrict}
                value={stateFilter.location.district}
              >
                {dataDistricts.map((option, index) => (
                  <option key={index} value={option.district_id}>
                    {option.district_prefix + " " + option.district_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="location-option wards">
              <label>Phường, xã</label>
              <select
                className="form-select"
                aria-label="Phường, xã"
                onChange={handleChangeWard}
                value={stateFilter.location.ward}
              >
                {dataWards.map((option, index) => (
                  <option key={index} value={option.ward_id}>
                    {option.ward_prefix + " " + option.ward_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-item filter-driver">
            <label>Tài xế</label>
            <select className="form-select" onChange={handleChageDriver}>
              <option value={"TULAI"}>Tự lái</option>
              <option value={"TAIXE"}>Có tài xế</option>
            </select>
          </div>
          <div className="filter-item filter-price">
            <label>Giá</label>
            <input
              type="range"
              min={0}
              max={10000000}
              step={100000}
              name="Price"
              value={stateFilter.price}
              className="form-range"
              onChange={handleChangePrice}
            />
            <span>{currencyFormat(stateFilter.price)}</span>
          </div>
          <div className="filter-item filter-date">
            <label>Ngày</label>
            <input
              type="date"
              value={stateFilter.dateStart}
              onChange={handleChangeDate}
            />
          </div>
          <div className="filter-item filter-seat">
            <div className="seat-box">
              <label className="label-box" htmlFor="seat-4">
                <div className="thumnail">
                  <img
                    src="https://n1-cstg.mioto.vn/m/vehicle-types/mf-4-sedan.png"
                    alt=""
                  />
                </div>
                <span>4 ghế</span>
              </label>
              <input
                type={"radio"}
                id="seat-4"
                name="seat-option"
                className="seat-radio"
                value={4}
                onChange={handChangeSeat}
              />
            </div>
            <div className="seat-box">
              <label className="label-box" htmlFor="seat-5">
                <div className="thumnail">
                  <img
                    src="https://n1-cstg.mioto.vn/m/vehicle-types/mf-5-suv.png"
                    alt=""
                  />
                </div>
                <span>5 ghế</span>
              </label>
              <input
                type={"radio"}
                id="seat-5"
                name="seat-option"
                className="seat-radio"
                value={5}
                onChange={handChangeSeat}
              />
            </div>
            <div className="seat-box">
              <label className="label-box" htmlFor="seat-7">
                <div className="thumnail">
                  <img
                    src="https://n1-cstg.mioto.vn/m/vehicle-types/mf-7-suv.png"
                    alt=""
                  />
                </div>
                <span>7 ghế</span>
              </label>
              <input
                type={"radio"}
                id="seat-7"
                name="seat-option"
                className="seat-radio"
                value={7}
                onChange={handChangeSeat}
              />
            </div>

            <div className="seat-box">
              <label className="label-box" htmlFor="seat-other">
                <div className="thumnail">
                  <img src="https://n1-cstg.mioto.vn/m/vehicle-types/mf-7-mpv.png" alt=""/>
                </div>
                <span>Khác</span>
              </label>
              <input
                type={"radio"}
                id="seat-other"
                name="seat-option"
                className="seat-radio"
                value={0}
                onChange={handChangeSeat}
              />
            </div>
          </div>
        </div>
        <div className="listing-car">
          <DisplayCar></DisplayCar>
        </div>
      </section>
    </>
  );
}

export default HireCar;
