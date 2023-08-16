import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const OrderForm = ({ priceOfPizza, priceOfTopping, addOrders }) => {
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
  };

  const [formInputs, setFormInputs] = useState(emptyForm);
  const [counter, setCounter] = useState(1);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isFormValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({
    size: "",
    thickness: "",
    checkCount: "",
    note: "",
    name: "",
    phone: "",
    address: "",
  });

  const formSchema = Yup.object().shape({
    size: Yup.string().required("Pizzanızın boyutunu seçiniz."),
    thickness: Yup.string().required("Hamur kalınlığı seçiniz."),
    note: Yup.string().max(50, "En fazla 50 karakter girebilirsiniz."),
    name: Yup.string()
      .required("İsminizi giriniz.")
      .min(2, "İsim en az iki karakter olmalıdır."),
    phone: Yup.string()
      .required("Telefon numaranızı giriniz.")
      .matches(/^5/, "Telefon numaranızı 5 ile başlayacak şekilde girin.")
      .length(10, "Telefon numaranız 10 karakter olmalı."),
    address: Yup.string().required("Teslimat adresini giriniz."),
    ...toppings.reduce((acc, topping) => {
      acc[topping.name] = Yup.boolean();
      return acc;
    }, {}),
  });

  const validateFormField = (event) => {
    const { name, value, type, checked } = event.target;
    const input = type === "checkbox" ? checked : value;

    Yup.reach(formSchema, name)
      .validate(input)
      .then((valid) => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [name]: error.errors[0] });
      });
  };

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    validateFormField(event);
    setFormInputs({
      ...formInputs,
      [name]: type === "checkbox" ? checked : value,
    });
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
    formSchema.isValid(formInputs).then((valid) => {
      setFormValid(valid);
    });
  }, [formInputs]);

  return (
    <Form id="pizza-form" onSubmit={submitHandler}>
      <div id="order-form" className="flex-container">
        <FormGroup id="pizza-size" className="flex-container">
          <h3>Boyut Seç</h3>
          <FormFeedback>{errors.size}</FormFeedback>
          <Label>
            <Input
              type="radio"
              name="size"
              value="S"
              onChange={changeHandler}
              checked={formInputs.size === "S"}
            />
            Küçük
          </Label>
          <Label>
            <Input
              type="radio"
              name="size"
              value="M"
              onChange={changeHandler}
              checked={formInputs.size === "M"}
            />
            Orta
          </Label>
          <Label>
            <Input
              type="radio"
              name="size"
              value="L"
              onChange={changeHandler}
              checked={formInputs.size === "L"}
            />
            Büyük
          </Label>
        </FormGroup>

        <FormGroup id="dough-size">
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
          <FormFeedback>{errors.thickness}</FormFeedback>
        </FormGroup>

        <FormGroup id="topping-checklist" className="flex-container">
          <h3>Ek Malzemeler</h3>
          <p>En fazla 10 malzeme seçebilirsiniz. {priceOfTopping}₺</p>
          <div id="toppings" className="flex-container">
            {toppings.map((topping, i) => {
              return (
                <Label key={i}>
                  <Input
                    type="checkbox"
                    name={topping.name}
                    onChange={changeHandler}
                    value={formInputs[topping.name]}
                    disabled={
                      checkedItems.length >= 10 && !formInputs[topping.name]
                    }
                  />
                  {topping.label}
                </Label>
              );
            })}
          </div>
          <FormFeedback>{errors.checkCount}</FormFeedback>
        </FormGroup>

        <div id="order-note">
          <h3>Sipariş Notu</h3>

          <Input
            id="special-text"
            name="note"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            onChange={changeHandler}
            value={formInputs.note}
            invalid={!!errors.note}
          />
          <FormFeedback>{errors.note}</FormFeedback>
        </div>
      </div>

      <hr />

      <h2>İletişim Bilgileri</h2>
      <FormGroup id="customer-info" className="flex-container">
        <Label>
          <h3>Ad Soyad</h3>
          <Input
            id="name-Input"
            name="name"
            placeholder="Ad Soyad"
            onChange={changeHandler}
            value={formInputs.name}
            invalid={!!errors.name}
          />
          <FormFeedback>{errors.name}</FormFeedback>
        </Label>

        <Label>
          <h3>Telefon</h3>
          <Input
            id="phone-Input"
            name="phone"
            placeholder="5xxxxxxxxx"
            onChange={changeHandler}
            value={formInputs.phone}
            invalid={!!errors.phone}
          />
          <FormFeedback>{errors.phone}</FormFeedback>
        </Label>

        <Label>
          <h3>Adres</h3>
          <Input
            id="address-Input"
            name="address"
            placeholder="Adres"
            onChange={changeHandler}
            value={formInputs.address}
          />
          <FormFeedback>{errors.address}</FormFeedback>
        </Label>
      </FormGroup>

      <hr />

      <div id="order-summary" className="flex-container">
        <div id="counter" className="flex-container">
          <Button id="decrement" name="decrement" onClick={clickHandler}>
            -
          </Button>
          <p>{counter}</p>
          <Button id="increment" name="increment" onClick={clickHandler}>
            +
          </Button>
        </div>

        <div id="order-sum">
          <div id="total-sum">
            <h2>Sipariş Toplamı</h2>
            <div id="topping-price" className="flex-container">
              <p>Seçimler</p>
              <p>
                {(counter * checkedItems.length * priceOfTopping).toFixed(2)}₺
              </p>
            </div>
            <div id="total-price" className="flex-container">
              <p>Toplam</p>
              <p>
                {(
                  counter *
                  (priceOfPizza + checkedItems.length * priceOfTopping)
                ).toFixed(2)}
                ₺
              </p>
            </div>
          </div>
          <Link to={isFormValid ? "/onay" : "#"}>
            <Button id="order-button" type="submit" disabled={!isFormValid}>
              SİPARİŞ VER
            </Button>
          </Link>
        </div>
      </div>
    </Form>
  );
};
export default OrderForm;
