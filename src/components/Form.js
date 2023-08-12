import React, { useState, useEffect } from "react";

const Home = ({ priceOfPizza, priceOfTopping, addOrders }) => {
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
  const [checkedItems, setCheckedItems] = useState(0);

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    const input = type === "checkbox" ? checked : value;
    setFormInputs({ ...formInputs, [name]: input });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    addOrders(formInputs);
    setFormInputs(emptyForm);
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
    for (let topping in formInputs) {
      formInputs[topping] === true && selectedToppings.push(topping);
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
            />
            Küçük
          </label>
          <label>
            <input
              type="radio"
              name="size"
              value="M"
              onChange={changeHandler}
            />
            Orta
          </label>
          <label>
            <input
              type="radio"
              name="size"
              value="L"
              onChange={changeHandler}
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
            <option value="thin">İnce</option>
            <option value="thick">Kalın</option>
          </select>
        </label>

        <div id="topping-checklist">
          <h3>Ek Malzemeler</h3>
          <p>En fazla 10 malzeme seçebilirsiniz. {priceOfTopping}₺</p>
          <label>
            <input type="checkbox" name="pepperoni" onChange={changeHandler} />
            Pepperoni
          </label>
          <label>
            <input type="checkbox" name="sosis" onChange={changeHandler} />
            Sosis
          </label>
          <label>
            <input type="checkbox" name="jambon" onChange={changeHandler} />
            Kanada Jambonu
          </label>
          <label>
            <input type="checkbox" name="tavuk" onChange={changeHandler} />
            Tavuk Izgara
          </label>
          <label>
            <input type="checkbox" name="sogan" onChange={changeHandler} />
            Soğan
          </label>
          <label>
            <input type="checkbox" name="domates" onChange={changeHandler} />
            Domates
          </label>
          <label>
            <input type="checkbox" name="misir" onChange={changeHandler} />
            Mısır
          </label>
          <label>
            <input type="checkbox" name="sucuk" onChange={changeHandler} />
            Sucuk
          </label>
          <label>
            <input type="checkbox" name="jalepeno" onChange={changeHandler} />
            Jalepeno
          </label>
          <label>
            <input type="checkbox" name="sarimsak" onChange={changeHandler} />
            Sarımsak
          </label>
          <label>
            <input type="checkbox" name="biber" onChange={changeHandler} />
            Biber
          </label>
          <label>
            <input type="checkbox" name="ananas" onChange={changeHandler} />
            Ananas
          </label>
          <label>
            <input type="checkbox" name="kabak" onChange={changeHandler} />
            Kabak
          </label>
        </div>

        <div id="order-note">
          <h3>Sipariş Notu</h3>
          <input
            id="special-text"
            name="note"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            onChange={changeHandler}
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
          ></input>
        </label>

        <label>
          <h3>Telefon</h3>
          <input
            id="phone-input"
            name="phone"
            placeholder="(5xx)-xxx-xxxx"
            onChange={changeHandler}
          ></input>
        </label>

        <label>
          <h3>Adres</h3>
          <input
            id="address-input"
            name="address"
            placeholder="Adres"
            onChange={changeHandler}
          ></input>
        </label>

        <div id="bill-type">
          <h3>Fatura Tipi</h3>
          <label>
            <input
              type="radio"
              name="bill"
              value="home"
              onChange={changeHandler}
            />
            Bireysel
          </label>
          <label>
            <input
              type="radio"
              name="bill"
              value="company"
              onChange={changeHandler}
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
            Sipariş Ver
          </button>
        </div>
      </div>
    </form>
  );
};
export default Home;
