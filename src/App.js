import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home.js";
import OrderPage from "./components/OrderPage.js";
import Confirmed from "./components/Confirmed.js";
import "./App.css";

const App = () => {
  return (
    <div id="App" className="flex-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pizza" component={OrderPage} />
          <Route exact path="/onay" component={Confirmed} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
