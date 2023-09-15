import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const openFormPage = function () {
    history.push("/pizza");
  };

  return (
    <div id="Home">
      <header id="home-header">
        <img src={require("../images/logo.svg")} alt="logo" />
        <p>fırsatı kaçırma</p>
        <h2>KOD ACIKTIRIR</h2>
        <h2>PİZZA, DOYURUR</h2>
        <Button id="order-pizza" onClick={openFormPage} data-cy="order-pizza">
          ACIKTIM
        </Button>
      </header>
    </div>
  );
};
export default Home;
