import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = ({ priceOfPizza, priceOfTopping, addOrders }) => {
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
    bill: "",
  };

  const [formInputs, setFormInputs] = useState(emptyForm);
  const [counter, setCounter] = useState(1);
  const [checkedItems, setCheckedItems] = useState([]);

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormInputs({ ...formInputs, [name]: checked });
    } else setFormInputs({ ...formInputs, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    addOrders(formInputs);
    setFormInputs(emptyForm);
    setCounter(1);
    setCheckedItems([]);
  };

  const clickHandler = (event) => {
    event.preventDefault();
    const { name } = event.target;
    if (name === "increment") setCounter(counter + 1);
    else if (name === "decrement") {
      counter > 1 ? setCounter(counter - 1) : setCounter(1);
    }
  };

  useEffect(() => {
    const selectedToppings = [];
    for (let name in formInputs) {
      formInputs[name] === true && selectedToppings.push(name);
    }
    setCheckedItems(selectedToppings);
  }, [formInputs]);

  return (
    <form id="pizza-form" onSubmit={submitHandler}>
      <div id="order-form">
        <div id="pizza-size">
          <h3>Boyut Seç</h3>
          <label>
            <input
              type="radio"
              name="size"
              value="S"
              onChange={changeHandler}
              checked={formInputs.size === "S"}
            />
            Küçük
          </label>
          <label>
            <input
              type="radio"
              name="size"
              value="M"
              onChange={changeHandler}
              checked={formInputs.size === "M"}
            />
            Orta
          </label>
          <label>
            <input
              type="radio"
              name="size"
              value="L"
              onChange={changeHandler}
              checked={formInputs.size === "L"}
            />
            Büyük
          </label>
        </div>

        <label id="dough-size">
          <h3>Hamur Seç</h3>
          <select
            id="size-dropdown"
            name="thickness"
            defaultValue=""
            onChange={changeHandler}
          >
            <option disabled value="">
              Hamur Kalınlığı
            </option>
            <option value="thin" checked={!!formInputs.thickness}>
              İnce
            </option>
            <option value="thick" checked={!!formInputs.thickness}>
              Kalın
            </option>
          </select>
        </label>

        <div id="topping-checklist">
          <h3>Ek Malzemeler</h3>
          <p>En fazla 10 malzeme seçebilirsiniz. {priceOfTopping}₺</p>
          {toppings.map((topping, i) => {
            return (
              <label key={i}>
                <input
                  type="checkbox"
                  name={topping.name}
                  onChange={changeHandler}
                  value={formInputs[topping.name]}
                  disabled={
                    checkedItems.length >= 10 && !formInputs[topping.name]
                  }
                />
                {topping.label}
              </label>
            );
          })}
        </div>

        <div id="order-note">
          <h3>Sipariş Notu</h3>
          <input
            id="special-text"
            name="note"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            onChange={changeHandler}
            value={formInputs.note}
          />
        </div>
      </div>

      <hr />

      <div id="customer-info">
        <h2>İletişim Bilgileri</h2>
        <label>
          <h3>Ad Soyad</h3>
          <input
            id="name-input"
            name="name"
            placeholder="Ad Soyad"
            onChange={changeHandler}
            value={formInputs.name}
          />
        </label>

        <label>
          <h3>Telefon</h3>
          <input
            id="phone-input"
            name="phone"
            placeholder="5xxxxxxxxx"
            onChange={changeHandler}
            value={formInputs.phone}
          />
        </label>

        <label>
          <h3>Adres</h3>
          <input
            id="address-input"
            name="address"
            placeholder="Adres"
            onChange={changeHandler}
            value={formInputs.address}
          />
        </label>

        <div id="bill-type">
          <h3>Fatura Tipi</h3>
          <label>
            <input
              type="radio"
              name="bill"
              value="home"
              onChange={changeHandler}
              checked={formInputs.bill}
            />
            Bireysel
          </label>
          <label>
            <input
              type="radio"
              name="bill"
              value="company"
              onChange={changeHandler}
              checked={formInputs.name}
            />
            Kurumsal
          </label>
        </div>
      </div>

      <hr />

      <div id="order-summary">
        <div id="counter">
          <button id="decrement" name="decrement" onClick={clickHandler}>
            -
          </button>
          {counter}
          <button id="increment" name="increment" onClick={clickHandler}>
            +
          </button>
        </div>

        <div id="total-sum">
          <h2>Sipariş Toplamı</h2>
          <div id="topping-price">
            <p>Seçimler</p>
            <p>
              {(counter * checkedItems.length * priceOfTopping).toFixed(2)}₺
            </p>
          </div>
          <div id="total-price">
            <p>Toplam</p>
            <p>
              {(
                counter *
                (priceOfPizza + checkedItems.length * priceOfTopping)
              ).toFixed(2)}
              ₺
            </p>
          </div>
          <button id="order-button" type="submit">
            <Link to="/onay">Sipariş Ver</Link>
          </button>
        </div>
      </div>
    </form>
  );
};
export default Home;
