import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="Home">
      <img src={require("../images/logo.svg")} alt="logo" />
      <h2>KOD ACIKTIRIR</h2>
      <h2>PİZZA, DOYURUR</h2>
      <Link to="/pizza">
        <Button id="order-pizza">ACIKTIM</Button>
      </Link>
    </div>
  );
};
export default Home;
