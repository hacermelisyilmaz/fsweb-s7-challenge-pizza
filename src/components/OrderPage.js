import React from "react";
import Form from "./Form.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const OrderPage = () => {
  const priceOfPizza = 85.5;
  const priceOfTopping = 5;

  return (
    <div>
      <header>
        <nav>
          <Link>Anasayfa</Link>
          <span>-</span>
          <Link>Seçenekler</Link>
          <span>-</span>
          <Link>Sipariş Oluştur</Link>
        </nav>
      </header>

      <h2 id="pizza-name">Position Absolute Acı Pizza</h2>
      <div id="pizza-price">{priceOfPizza.toFixed(2)}₺</div>
      <div id="pizza-rating">
        <p id="pizza-rating-score">4.9</p>
        <p id="pizza-rating-number">(200)</p>
      </div>
      <p>
        Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
        pizza tam sana göre. Pizza, domates, peynir ve genellikle ceşitli diğer
        malzemelerle kaplanmiş, daha sonra geleneksel olarak odun atesinde bir
        firinda yüksek sıcaklikta pişirilen. genellikle yuvarlak, düzleştirilmiş
        mayalı buğday bazlı hamurdan oluşan italyan kökenli lezzetli bir
        yemektir. . Küçük bir pizzaya bazen pizzetta denir.
      </p>

      <Form priceOfPizza={priceOfPizza} priceOfTopping={priceOfTopping} />
    </div>
  );
};

export default OrderPage;