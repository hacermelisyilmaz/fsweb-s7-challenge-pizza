import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  return (
    <div id="Home">
      <img src={require("../images/logo.svg")} alt="logo" />
      <h2>KOD ACIKTIRIR</h2>
      <h2>PİZZA, DOYURUR</h2>
      <button id="order-pizza">
        <Link to="/pizza">ACIKTIM</Link>
      </button>
    </div>
  );
};
export default Home;
