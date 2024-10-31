import React from "react";
import heroImg from "../assets/images/heroImg.jpg";

const LandingPage = () => {
  return (
    <div className="container">
      
      <div
        className="fw-semibold row mb-4"
        style={{ fontFamily: "DM Serif Display, serif", fontSize: "5.5rem", borderTop: '1px solid', borderBottom: '1px solid'}}
      >
        <div className="col">
        <span className="mx-3">Minimal</span>
        ·
        </div>
        <div className="col">
        <span className="mx-3">Sustainable</span>
        ·
        </div>
        <div className="col">
        <span className="mx-3">Stylish</span>
        </div>
      </div>

      <img src={heroImg} alt="Fashion Wardrobe img" className="img-fluid" />
    </div>
  );
};

export default LandingPage;
