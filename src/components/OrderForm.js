import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const OrderForm = ({
  sizes,
  toppings,
  emptyForm,
  priceOfPizza,
  priceOfTopping,
  addOrders,
}) => {
  const history = useHistory();

  const [modal, setModal] = useState(false);
  const [formInputs, setFormInputs] = useState(emptyForm);
  const [counter, setCounter] = useState(1);
  const [checkedItems, setCheckedItems] = useState([]);
  const [toppingsPrice, setToppingsPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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
      .min(2, "İsim en az 2 karakter olmalıdır"),
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

  const toggle = () => setModal(!modal);

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
    axios
      .post("https://reqres.in/api/users", formInputs)
      .then(function (response) {
        addOrders(formInputs);
        history.push("/onay");
        setFormInputs(emptyForm);
        setCounter(1);
        setCheckedItems([]);
      })
      .catch(function (error) {
        console.error(error);
        setModal(true);
      });
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

  useEffect(() => {
    setFormInputs({ ...formInputs, amount: counter });
  }, [counter]);

  useEffect(() => {
    setToppingsPrice(counter * checkedItems.length * priceOfTopping);
    setTotalPrice(
      counter * (priceOfPizza + checkedItems.length * priceOfTopping)
    );
  }, [counter, checkedItems]);

  console.log(formInputs);
  return (
    <Form id="pizza-form" onSubmit={submitHandler}>
      <div id="order-form" className="flex-container">
        <FormGroup id="pizza-size" className="flex-container">
          <h3>Boyut Seç</h3>
          {sizes.map((size, i) => {
            return (
              <Label key={i}>
                <Input
                  type="radio"
                  name="size"
                  value={size.name}
                  onChange={changeHandler}
                  checked={formInputs.size === size.name}
                  data-cy="size-input"
                />
                {size.label}
              </Label>
            );
          })}
        </FormGroup>

        <FormGroup id="dough-thickness">
          <h3>Hamur Seç</h3>
          <select
            id="thickness-dropdown"
            name="thickness"
            defaultValue=""
            onChange={changeHandler}
            data-cy="thickness-input"
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
                    data-cy={`${topping.name}-input`}
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
            data-cy="note-input"
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
            id="name-input"
            name="name"
            placeholder="Ad Soyad"
            onChange={changeHandler}
            value={formInputs.name}
            invalid={!!errors.name}
            data-cy="name-input"
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
            data-cy="phone-input"
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
            invalid={!!errors.address}
            data-cy="address-input"
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
              <p>{toppingsPrice.toFixed(2)}₺</p>
            </div>
            <div id="total-price" className="flex-container">
              <p>Toplam</p>
              <p>{totalPrice.toFixed(2)}₺</p>
            </div>
          </div>
          <Button
            id="order-button"
            type="submit"
            disabled={!isFormValid}
            data-cy="order-button"
          >
            SİPARİŞ VER
          </Button>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Hata</ModalHeader>
        <ModalBody>
          Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Kapat
          </Button>
        </ModalFooter>
      </Modal>
    </Form>
  );
};
export default OrderForm;
