import React from "react";
import "./quantitybutton.css";
import { useState } from "react";
import { modProductQ } from "./action/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function QuantityButton(props) {
  let maxQuant = props.maxQuant;
  const dispatch = useDispatch();

  const [increment, setIncrement] = useState(0);
  const modProductToArrayQuantity = (index, q) => {
    modProductQ(dispatch)({ index: index, quantity: q });

    //console.log(product_redux);
  };
  function increase() {
    //props.quant = increment;
    // console.log(props.index);

    if (increment >= maxQuant) {
      setIncrement(maxQuant);
    } else {
      setIncrement(increment + 1);
    }
  }

  function decrease() {
    if (increment > 0) {
      setIncrement(increment - 1);
    } else {
      setIncrement(0);
    }
  }
  const product_redux_app = useSelector((state) => state);
  let len_r = product_redux_app.length - 1;
  return (
    <div>
      <div className="quantity-input">
        <button
          className="quantity-input__modifier quantity-input__modifier--left"
          onClick={() => {
            decrease();
            // modProductToArrayQuantity(len_r, increment);
          }}
        >
          &mdash;
        </button>
        <input
          className="quantity-input__screen"
          type="text"
          value={increment}
          readOnly
        />
        <button
          className="quantity-input__modifier quantity-input__modifier--right"
          onClick={() => {
            increase();
            // modProductToArrayQuantity(len_r, increment);
          }}
        >
          &#xff0b;
        </button>
        <button
          onClick={() => {
            console.log(product_redux_app);
          }}
        >
          click
        </button>
      </div>
    </div>
  );
}
