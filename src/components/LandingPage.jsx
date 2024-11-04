import React from "react";
import heroImg from "../assets/images/heroImg.jpg";

const LandingPage = () => {
  return (
    <div className="container">
      <div
        className="fw-semibold row mb-4 d-flex justify-content-around"
        style={{
          fontFamily: "DM Serif Display, serif",
          fontSize: "3rem",
          borderTop: "1px solid",
          borderBottom: "1px solid",
        }}
      >
        <div className="col text-center">Minimal • Sustainable • Stylish</div>

      </div>

      <img src={heroImg} alt="Fashion Wardrobe img" className="img-fluid" />
    </div>
  );
};

export default LandingPage;
