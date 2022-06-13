import clsx from "clsx";
import { useEffect, useState } from "react";
import CreateCarAPi from "../../Api/CreateCarApi";
import LocationApi from "../../Api/LocationApi";
import defaultImageSrc from "../../Assets/Images/defaultCar.png";

function CreateCar() {
  const [isClickBrand, setIsClickBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  const [carLX, setCarLX] = useState([]);
  const [carGTTX, setCarGTTX] = useState([]);
  const [carTD, setCarTD] = useState([]);
  const [carNL, setCarNL] = useState([]);
  const [carTN, setCarTN] = useState([]);
  const [carBrand, setCarBrand] = useState([]);
  const [imageCar, setImageCar] = useState({
    ImageFile: defaultImageSrc,
    src: defaultImageSrc,
    alt: "default image car",
  });

  const [stateFilter, setStateFilter] = useState({
    Name: "",
    Description: "",
    Price: "",
    BrandId: "",
    location: {
      province: 1,
      district: 1,
      ward: 1,
    },
    address_booking: "",
    rules: "",
    detail_ids: "",
    Img: {
      ImageFile: defaultImageSrc,
      src: defaultImageSrc,
      alt: "default image car",
    },
  });

  const [dataProvinces, setDataProvinces] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [dataWards, setDataWards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let res = await LocationApi.getProvinces();
        if (res.success === true) {
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

  const handleChangeProvince = (e) => {
    setStateFilter({
      ...stateFilter,
      location: { ...stateFilter.location, province: e.target.value },
    });
  };

  const handleChangeDistrict = (e) => {
    setStateFilter({
      ...stateFilter,
      location: { ...stateFilter.location, district: e.target.value },
    });
  };

  const handleChangeWard = (e) => {
    setStateFilter({
      ...stateFilter,
      location: { ...stateFilter.location, ward: e.target.value },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        let resGTTX = await CreateCarAPi.getGTTX(
          localStorage.getItem("accesstoken")
        );
        if (resGTTX.success === true) {
          setCarGTTX(resGTTX.data);
        } else {
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        let resLX = await CreateCarAPi.getLX(
          localStorage.getItem("accesstoken")
        );
        if (resLX.success === true) {
          setCarLX(resLX.data);
        } else {
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        let resTD = await CreateCarAPi.getTD(
          localStorage.getItem("accesstoken")
        );
        if (resTD.success === true) {
          setCarTD(resTD.data);
        } else {
          console.log("a");
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        let resNL = await CreateCarAPi.getNL(
          localStorage.getItem("accesstoken")
        );
        if (resNL.success === true) {
          setCarNL(resNL.data);
        } else {
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        let resTN = await CreateCarAPi.getTN(
          localStorage.getItem("accesstoken")
        );
        if (resTN.success === true) {
          setCarTN(resTN.data);
        } else {
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        let resBrand = await CreateCarAPi.getBrands(
          localStorage.getItem("accesstoken")
        );
        if (resBrand.success === true) {
          setCarBrand(resBrand.data);
        } else {
        }
      } catch (error) {}
    })();
  }, []);

  const imageHandle = (e) => {
    let fileChoose;
    var reader;
    if (e.target.files && e.target.files[0]) {
      fileChoose = e.target.files[0];
      // console.log(fileChoose);
      reader = new FileReader();

      reader.onload = (x) => {
        if (reader.readyState === 2) {
          setImageCar({
            ImageFile: fileChoose,
            src: reader.result,
            alt: "Car",
          });
          // console.log("Result :" + reader.result);
        } else {
          setImageCar({
            ImageFile: defaultImageSrc,
            src: defaultImageSrc,
            alt: "default image car",
          });
        }
      };
      reader.readAsDataURL(fileChoose);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    let detailId =
      e.target.SG.value +
      "," +
      e.target.TD.value +
      "," +
      e.target.NL.value +
      "," +
      e.target.MTT.value +
      "," +
      e.target.TN.value +
      "," +
      e.target.GTTX.value +
      "," +
      e.target.LX.value;

    formData.append("Name", e.target.Name.value);
    formData.append("Description", e.target.Description.value);
    formData.append("Price", e.target.Price.value);
    formData.append("BrandId", e.target.BrandId.value);
    formData.append("ProvinceId", e.target.ProvinceId.value);
    formData.append("DistrictId", e.target.DistrictId.value);
    formData.append("WardId", e.target.WardId.value);
    formData.append("address_booking", e.target.AddressBooking.value);
    formData.append("rules", e.target.Rules.value);
    formData.append("detail_ids", detailId);
    formData.append("Img", imageCar.ImageFile);

    for (let [key, value] of formData.entries()) {
      console.log(key + " :" + value);
    }

    CreateCarAPi.postNewCar(formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddBrand = (e) => {
    e.preventDefault();
    setIsClickBrand(true);
  };

  const handleClickClose = (e) => {
    e.preventDefault();
    setIsClickBrand(false);
    setNewBrand("");
  };
  const handleClickPreScrim = () => {
    setIsClickBrand(false);
    setNewBrand("");
  };

  const onChangeInputNewBrand = (e) => {
    setNewBrand(e.target.value);
  };
  const handleSubmitCreateBrand = (e) => {
    e.preventDefault();
    let data = {
      code: carBrand[carBrand.length - 1].id + 1,
      name: newBrand,
    };
    (async () => {
      try {
        let res = await CreateCarAPi.postNewBrand(JSON.stringify(data));
        console.log(res);
      } catch (error) {}
    })();
  };

  return (
    <>
      <div className="container mb-3">
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Tên</label>
                <input
                  type="text"
                  name="Name"
                  className="form-control"
                  placeholder="Name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Loại xe</label>
                <select className="form-select" name="LX">
                  {carLX.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.val}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Giấy tờ thuê xe</label>
                <select className="form-select" name="GTTX">
                  {carGTTX.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.val}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <textarea
                  type="text"
                  name="Description"
                  rows={4}
                  className="form-control"
                  placeholder="Description"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Giá</label>
                <input
                  type="text"
                  name="Price"
                  className="form-control"
                  placeholder="Price"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Số ghế</label>
                <input
                  type="number"
                  name="SG"
                  className="form-control"
                  min={0}
                  defaultValue={0}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Truyền động</label>
                <select className="form-select" name="TD">
                  {carTD.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.val}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Nhiên liệu</label>
                <select className="form-select" name="NL">
                  {carNL.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.val}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Mức tiêu thụ nhiêu liệu)</label>
                <input
                  type="text"
                  name="MTT"
                  className="form-control"
                  placeholder="MTT/100km"
                />
              </div>

              <div className="mb-3">
                <label>Tính năng</label>
                <br />
                <select className="form-select" name="TN">
                  {carTN.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.val}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Hãng xe</label>
                <div className="d-flex">
                  <select className="form-select" name="BrandId">
                    {carBrand.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="flex-end ms-3 btn btn-primary "
                    style={{ display: "none" }}
                    onClick={handleAddBrand}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Tỉnh</label>
                <select
                  className="form-select"
                  name="ProvinceId"
                  onChange={handleChangeProvince}
                  value={stateFilter.location.province}
                >
                  {dataProvinces.map((option, index) => (
                    <option key={index} value={option.province_id}>
                      {option.province_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Quận huyện</label>
                <select
                  className="form-select"
                  name="DistrictId"
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

              <div className="mb-3">
                <label className="form-label">Thị xã phường</label>
                <select
                  className="form-select"
                  name="WardId"
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
              <div className="mb-3">
                <label className="form-label">Địa chỉ nhận xe</label>
                <input
                  type="text"
                  name="AddressBooking"
                  className="form-control"
                  placeholder="Address"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Điều khoản</label>
                <textarea
                  type="text"
                  name="Rules"
                  className="form-control"
                  placeholder="Policy"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hình ảnh</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  name="ImgCar"
                  className="form-control"
                  placeholder="Images"
                  onChange={imageHandle}
                />
              </div>
              <div className="form-group mt-3 w-50">
                <img
                  src={imageCar.src}
                  alt={imageCar.alt}
                  className="border rounded "
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div className="mb-3 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Đăng Ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={clsx("pre-scrim", { "is-open": isClickBrand })}
        onClick={handleClickPreScrim}
      ></div>
      <div className={clsx("create-brand", { "is-open": isClickBrand })}>
        <button className="close-create-brand btn" onClick={handleClickClose}>
          X
        </button>
        <h3>Create Brand</h3>
        <div className="box-item wrap-input">
          <form>
            <input
              type="text"
              className="form-control"
              value={newBrand}
              onChange={onChangeInputNewBrand}
            />
            <div className="wrap-btn">
              <button type="reset" className="btn-reset btn btn-warning ">
                Reset
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitCreateBrand}
              >
                Ok
              </button>
            </div>
          </form>
        </div>
        <p className="res-message">ok</p>
      </div>
    </>
  );
}
export default CreateCar;
