import React, { useEffect, useState } from "react";
import * as ReactIcons from "react-icons/fa";
import CreateCarAPi from "../../Api/CreateCarApi";
import LocationApi from "../../Api/LocationApi";
import defaultImageSrc from "../../Assets/Images/defaultCar.png";

function CreateCar() {
  const [newBrand, setNewBrand] = useState("");

  const [optProvinces, setOptProvinces] = useState([]);
  const [optDistricts, setOptDistricts] = useState([]);
  const [optWards, setOptWards] = useState([]);
  const [selectProvinceId, setSelectProvinceId] = useState(1);
  const [selectDistrictId, setSelectDistrictId] = useState(1);
  const [selectWardId, setSelectWardId] = useState(1);
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

  var resAll = CreateCarAPi.getAll(localStorage.getItem("accesstoken"));
  var resLX = CreateCarAPi.getLX(localStorage.getItem("accesstoken"));
  var resGTTX = CreateCarAPi.getGTTX(localStorage.getItem("accesstoken"));
  var resTD = CreateCarAPi.getTD(localStorage.getItem("accesstoken"));
  var resNL = CreateCarAPi.getNL(localStorage.getItem("accesstoken"));
  var resMTT = CreateCarAPi.getMTT(localStorage.getItem("accesstoken"));
  var resTN = CreateCarAPi.getTN(localStorage.getItem("accesstoken"));
  var resBrand = CreateCarAPi.getBrands(localStorage.getItem("accesstoken"));
  // option provinces
  useEffect(() => {
    const resProvinces = async () => {
      await LocationApi.getProvinces().then((res) => {
        if (res.success === true) {
          setOptProvinces(res.data);
        }
      });
    };
    resProvinces();
  }, []);

  // option districts
  useEffect(() => {
    const resDistricts = async () => {
      await LocationApi.getDistrictByProvince(selectProvinceId).then((res) => {
        if (res.success === true) {
          setOptDistricts(res.data);
          setSelectDistrictId(res.data[0].district_id);
          // console.log(res.data[0].district_id);
        }
      });
    };
    resDistricts();
  }, [selectProvinceId]);

  // option wards
  useEffect(() => {
    const resWards = async () => {
      await LocationApi.getWardByDistric(selectDistrictId).then((res) => {
        if (res.success === true) {
          let arrWard;
          arrWard = res.data.filter(
            (ward) => ward.province_id == selectProvinceId
          );
          setOptWards(arrWard);
          setSelectWardId(arrWard.ward_id);
        }
      });
    };
    resWards();
  }, [selectProvinceId, selectDistrictId]);

  const handleSelectProvince = (event) => {
    var provinceSelected = event.target.value;
    setSelectProvinceId(provinceSelected);
  };

  const handleSelectDistrict = (event) => {
    var districSelected = event.target.value;
    setSelectDistrictId(districSelected);
  };

  useEffect(() => {
    const getGTTXApi = async () => {
      await resGTTX
        .then((res) => {
          if (res.success === true) {
            // console.log(res.data);
            setCarGTTX(res.data);
          }
        })
        .catch(Error);
    };
    getGTTXApi();

    const getLXApi = async () => {
      await resLX
        .then((res) => {
          if (res.success === true) {
            // console.log(res.data);
            setCarLX(res.data);
          }
        })
        .catch(Error);
    };
    getLXApi();

    const getTDApi = async () => {
      await resTD
        .then((res) => {
          if (res.success === true) {
            // console.log(res.data);
            setCarTD(res.data);
          }
        })
        .catch(Error);
    };
    getTDApi();

    const getNLApi = async () => {
      await resNL
        .then((res) => {
          if (res.success === true) {
            // console.log(res.data);
            setCarNL(res.data);
          }
        })
        .catch(Error);
    };
    getNLApi();

    const getTNApi = async () => {
      await resTN
        .then((res) => {
          if (res.success === true) {
            // console.log(res.data);
            setCarTN(res.data);
          }
        })
        .catch(Error);
    };
    getTNApi();

    const getBrandApi = async () => {
      await resBrand
        .then((res) => {
          if (res.success === true) {
            // console.log(res.data);
            setCarBrand(res.data);
          }
        })
        .catch(Error);
    };
    getBrandApi();
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

  return (
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
                <button className="flex-end ms-3 btn btn-primary ">Add</button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Tỉnh</label>
              <select
                className="form-select"
                name="ProvinceId"
                onChange={handleSelectProvince}
              >
                {optProvinces.map((option, index) => (
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
                onChange={handleSelectDistrict}
              >
                {optDistricts.map((option, index) => (
                  <option key={index} value={option.district_id}>
                    {option.district_prefix + " " + option.district_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Thị xã phường</label>
              <select className="form-select" name="WardId">
                {optWards.map((option, index) => (
                  <option key={index} value={option.ward_id}>
                    {option.ward_prefix + " " + option.ward_name}
                  </option>
                ))}
              </select>
            </div>

            {/* <LocationMap /> */}

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
  );
}
export default CreateCar;
