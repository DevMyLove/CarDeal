import React from "react";
import DisplayCar from "../Cars/DisplayCar";
import CarAreaSect from "./CarAreaSect";
import Destination from "./Destination";
import FeatureSect from "./FeatureSect";
import OwnerSect from "./OwnerSect";
import TutorialSect from "./TutorialSect";

function Home() {
  return (
    <>
      <div className="pre-wrap-home">
        <div className="wrap-home">
          <FeatureSect />
          <TutorialSect />
          <Destination />
          <OwnerSect />
          <CarAreaSect />
          {/* <div className="pre-wrap-product d-flex justify-content-center align-items">
            <div className="wrap-product">
              <DisplayCar />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
