import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const tabs = [
    { name: "kore", label: "YENİ! Kore" },
    { name: "pizza", label: "Pizza" },
    { name: "burger", label: "Burger" },
    { name: "fries", label: "Kızartmalar" },
    { name: "fastfood", label: "Fast Food" },
    { name: "softdrinks", label: "Gazlı İçecek" },
  ];

  return (
    <div id="Home">
      <header id="home-header">
        <img src={require("../images/logo.svg")} alt="logo" />
        <p>fırsatı kaçırma</p>
        <h2>KOD ACIKTIRIR</h2>
        <h2>PİZZA, DOYURUR</h2>
        <Link to="/pizza">
          <Button id="order-pizza" data-cy="order-pizza">
            ACIKTIM
          </Button>
        </Link>
      </header>
    </div>
  );
};
export default Home;
