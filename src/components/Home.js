import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  return (
    <div>
      <h2>KOD ACIKTIRIR</h2>
      <h2>PIZZA, DOYURUR</h2>
      <button id="order-pizza">
        <Link to="/pizza">ACIKTIM</Link>
      </button>
    </div>
  );
};
export default Home;