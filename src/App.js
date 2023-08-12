import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home.js";
import OrderForm from "./components/OrderForm.js";
import Confirmed from "./components/Confirmed.js";

const App = () => {
  return (
    <BrowserRouter>
      <h1>Teknolojik Yemekler</h1>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pizza" component={OrderForm} />
        <Route exact path="/onay" component={Confirmed} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
