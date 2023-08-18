import React, { useState } from "react";
import OrderForm from "../components/OrderForm.js";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [ordersList, setOrdersList] = useState([]);

  const sizes = [
    { name: "S", label: "Küçük" },
    { name: "M", label: "Orta" },
    { name: "L", label: "Büyük" },
  ];
  const toppings = [
    { name: "pepperoni", label: "Pepperoni" },
    { name: "sosis", label: "Sosis" },
    { name: "jambon", label: "Kanada Jambonu" },
    { name: "tavuk", label: "Tavuk Izgara" },
    { name: "sogan", label: "Soğan" },
    { name: "domates", label: "Domates" },
    { name: "misir", label: "Mısır" },
    { name: "sucuk", label: "Sucuk" },
    { name: "jalepeno", label: "Jalepeno" },
    { name: "sarimsak", label: "Sarımsak" },
    { name: "biber", label: "Biber" },
    { name: "ananas", label: "Ananas" },
    { name: "kabak", label: "Kabak" },
  ];
  const emptyForm = {
    size: "",
    thickness: "",
    pepperoni: false,
    sosis: false,
    jambon: false,
    tavuk: false,
    sogan: false,
    domates: false,
    misir: false,
    sucuk: false,
    jalepeno: false,
    sarimsak: false,
    biber: false,
    ananas: false,
    kabak: false,
    note: "",
    name: "",
    phone: "",
    address: "",
    amount: 1,
  };

  const priceOfPizza = 85.5;
  const priceOfTopping = 5;

  const addOrders = function (order) {
    setOrdersList([...ordersList, order]);
    console.log(ordersList);
  };

  return (
    <div id="Order-Page">
      <div className="header">
        <header className="flex-container">
          <img src={require("../images/logo.svg")} alt="logo" />
          <nav>
            <Link to="/">Anasayfa</Link>
            <span> - </span>
            <Link>Seçenekler</Link>
            <span> - </span>
            <Link to="/pizza">Sipariş Oluştur</Link>
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

        <OrderForm
          sizes={sizes}
          toppings={toppings}
          emptyForm={emptyForm}
          priceOfPizza={priceOfPizza}
          priceOfTopping={priceOfTopping}
          addOrders={addOrders}
        />
      </div>
    </div>
  );
};

export default OrderPage;
