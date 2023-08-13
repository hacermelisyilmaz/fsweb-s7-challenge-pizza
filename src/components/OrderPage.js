import React, { useState } from "react";
import Form from "./Form.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const OrderPage = () => {
  const [ordersList, setOrdersList] = useState([]);

  const priceOfPizza = 85.5;
  const priceOfTopping = 5;

  const addOrders = function (order) {
    setOrdersList([...ordersList, order]);
  };

  return (
    <div id="Order-Page">
      <div className="header">
        <header className="flex-container">
          <img src={require("../images/logo.svg")} alt="logo" />
          <nav>
            <Link>Anasayfa</Link>
            <span> - </span>
            <Link>Seçenekler</Link>
            <span> - </span>
            <Link>Sipariş Oluştur</Link>
          </nav>
        </header>
      </div>

      <div id="order-page-content" className="flex-container">
        <h2 id="pizza-name">Position Absolute Acı Pizza</h2>
        <div id="pizza-info" className="flex-container">
          <div id="pizza-price">{priceOfPizza.toFixed(2)}₺</div>
          <div id="pizza-rating" className="flex-container">
            <p>4.9</p>
            <p>(200)</p>
          </div>
        </div>
        <p>
          Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle ceşitli
          diğer malzemelerle kaplanmiş, daha sonra geleneksel olarak odun
          atesinde bir firinda yüksek sıcaklikta pişirilen. genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
        </p>

        <Form
          priceOfPizza={priceOfPizza}
          priceOfTopping={priceOfTopping}
          addOrders={addOrders}
        />
      </div>
    </div>
  );
};

export default OrderPage;
