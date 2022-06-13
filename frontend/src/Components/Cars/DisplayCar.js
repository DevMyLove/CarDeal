import React, { useEffect, useRef, useState } from "react";
import DisplayCarApi from "../../Api/DisplayCarApi";
import CardCar from "../Home/CardCar";

function DisplayCar() {
  const [dataCar, setDataCar] = useState([]);
  const [pageOld, setPageOld] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await DisplayCarApi.ListCar(pageNum);
        if (res.success == true) {
          if (res.data.items.length > 0) {
            setDataCar(res.data.items);
            setPageOld(pageNum);
          } else {
            console.log("hết xe");
            setPageNum(pageOld);
          }
        } else {
          console.log(res.message);
        }
      } catch (error) {}
    })();
  }, [pageNum]);

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };
  const handlePage1 = (e) => {
    e.preventDefault();
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };
  const handlePage2 = (e) => {
    e.preventDefault();
  };
  const handlePage3 = (e) => {
    e.preventDefault();
    setPageNum(pageNum + 1);
  };
  const handleNextPage = (e) => {
    e.preventDefault();
    setPageNum(pageNum + 1);
  };

  return (
    <>
      <div id="box-list-car" className="box-list">
        {dataCar &&
          dataCar.map((item, index) => {
            return <CardCar key={`c_${index}`} item={item} />;
          })}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button className="page-link" onClick={handlePrevPage}>
              Prev
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={handlePage1}>
              {pageNum - 1}
            </button>
          </li>
          <li className="page-item">
            <button className="btn btn-info" onClick={handlePage2}>
              {pageNum}
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={handlePage3}>
              {pageNum + 1}
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default DisplayCar;
