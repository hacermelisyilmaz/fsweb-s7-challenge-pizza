import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.js";
import OrderPage from "./pages/OrderPage.js";
import Confirmed from "./pages/Confirmed.js";
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
