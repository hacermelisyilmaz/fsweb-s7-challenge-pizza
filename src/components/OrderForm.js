import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const OrderForm = () => {
  const [formInputs, setFormInputs] = useState();
  const [counter, setCounter] = useState(1);

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
      <div id="pizza-price">85.50₺</div>
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

      <form id="pizza-form">
        <div id="order-form">
          <div id="pizza-size">
            <h3>Boyut Seç</h3>
            <label>
              <input type="radio" name="size" value="S" />
              Küçük
            </label>
            <label>
              <input type="radio" name="size" value="M" />
              Orta
            </label>
            <label>
              <input type="radio" name="size" value="L" />
              Büyük
            </label>
          </div>

          <label id="dough-size">
            <h3>Hamur Seç</h3>
            <select id="size-dropdown" defaultValue="">
              <option disabled value="">
                Hamur Kalınlığı
              </option>
              <option value="thin">İnce</option>
              <option value="thick">Kalın</option>
            </select>
          </label>

          <div id="topping-checklist">
            <h3>Ek Malzemeler</h3>
            <p>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <label>
              <input type="checkbox" name="pepperoni" />
              Pepperoni
            </label>
            <label>
              <input type="checkbox" name="sosis" />
              Sosis
            </label>
            <label>
              <input type="checkbox" name="kanada-jambonu" />
              Kanada Jambonu
            </label>
            <label>
              <input type="checkbox" name="tavuk-izgara" />
              Tavuk Izgara
            </label>
            <label>
              <input type="checkbox" name="sogan" />
              Soğan
            </label>
            <label>
              <input type="checkbox" name="domates" />
              Domates
            </label>
            <label>
              <input type="checkbox" name="mısır" />
              Mısır
            </label>
            <label>
              <input type="checkbox" name="sucuk" />
              Sucuk
            </label>
            <label>
              <input type="checkbox" name="jalepeno" />
              Jalepeno
            </label>
            <label>
              <input type="checkbox" name="sarımsak" />
              Sarımsak
            </label>
            <label>
              <input type="checkbox" name="biber" />
              Biber
            </label>
            <label>
              <input type="checkbox" name="ananas" />
              Ananas
            </label>
            <label>
              <input type="checkbox" name="kabak" />
              Kabak
            </label>
          </div>

          <div id="order-note">
            <h3>Sipariş Notu</h3>
            <input
              id="special-text"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
            />
          </div>
        </div>
        <hr />
        <div id="customer-info">
          <h2>İletişim Bilgileri</h2>
          <label>
            <h3>Ad Soyad</h3>
            <input id="name-input" placeholder="Ad Soyad"></input>
          </label>

          <label>
            <h3>Telefon</h3>
            <input id="phone-input" placeholder="(5xx)-xxx-xxxx"></input>
          </label>

          <label>
            <h3>Adres</h3>
            <input id="address-input" placeholder="Adres"></input>
          </label>

          <div id="bill-type">
            <h3>Fatura Tipi</h3>
            <label>
              <input type="radio" name="bill" value="home" />
              Bireysel
            </label>
            <label>
              <input type="radio" name="bill" value="company" />
              Kurumsal
            </label>
          </div>
        </div>
        <hr />
        <div id="order-sum">
          <div id="number-of-pizza">
            <button className="decrement">-</button>
            {counter}
            <button className="increment">+</button>
          </div>
        </div>
        <button id="order-button">Sipariş Ver</button>
      </form>
    </div>
  );
};
export default OrderForm;
