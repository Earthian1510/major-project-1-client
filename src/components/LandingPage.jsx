import React from "react";
import heroImg from "../assets/images/heroImg.jpg";

const LandingPage = () => {
  return (
    <div className="container">
      <div
        className="fw-semibold"
        style={{ fontFamily: "DM Serif Display, serif", fontSize: "95px"}}
      >
        <span className="mx-3">Minimal</span>
        ·
        <span className="mx-3">Sustainable</span>
        ·
        <span className="mx-3">Stylish</span>
      </div>

      <img src={heroImg} alt="Fashion Wardrobe img" className="img-fluid" />
    </div>
  );
};

export default LandingPage;
