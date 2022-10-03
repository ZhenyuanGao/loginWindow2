import React from "react";
import ControlPage from "./controlPage";
import { Button, Input } from "antd";
//import { DetailsModal } from "./ExtraModal";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { Product } from "./Product";

import { modifyUser } from "./actions/index";

function validateInfo(promo) {
  let errors = { full_check: false, value: 0 };
  let format = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;

  if (promo.length !== 4) {
    errors.promo = "this promo code is invalid";
  }
  if (promo.length === 4) {
    errors.value = 10;
  }

  return errors;
}

export default function CheckOut() {
  const [forShopping, setForShopping] = useState(false);
  const product_redux = useSelector((state) => state);
  const [testDetail, setTestDetail] = useState(-1);
  const [errors, setErrors] = useState({ value: 0 });

  useEffect(() => {
    //  console.log("l");
  }, [product_redux]);

  //throw new Error();
  return (
    <>
      <Modal titleText={""} visible={forShopping} setVisible={setForShopping}>
        <>
          <h2>Products For CheckOut</h2>
          <div className="column">
            <>
              {product_redux.map((product, index) => (
                <>
                  <Product
                    key={product.name + index}
                    product={product}
                    index={index}
                    finalCheckout={true}
                  ></Product>
                </>
              ))}

              <div>
                <p className="promo">Apply the Promo code</p>
                <div className="two_buttons">
                  <Input
                    style={{ width: 240 }}
                    placeholder="input Promo Code here."
                    onBlur={(e) => {
                      setErrors(validateInfo(e.target.value));

                      /*
                    modifyUser({
                      email: "kega@wesmo.edu",
                      shoppingList: JSON.stringify(product_redux),
                    });
                    */
                    }}
                  ></Input>
                  <Button
                    onClick={() => {
                      localStorage.setItem(
                        "myShoppingList",
                        JSON.stringify(product_redux)
                      );
                    }}
                  >
                    Apply
                  </Button>
                </div>
                <div className="email_not_empty">
                  {" "}
                  {errors.promo && <p> {errors.promo}</p>}
                </div>
                <div className="actual_total">
                  <p> Estimated Total:</p>$
                  {product_redux.reduce((previousV, product) => {
                    previousV += product.price * product.quantity;
                    return previousV;
                  }, 0)}
                </div>
                <div className="actual_total">
                  <p> Actual Total: </p>$
                  {product_redux.reduce((previousV, product) => {
                    previousV += product.price * product.quantity;
                    return previousV;
                  }, 0) - errors.value}
                </div>
              </div>
              <Button
                onClick={() => {
                  localStorage.removeItem("myShoppingList");
                }}
                size={"large"}
              >
                Continue to Checkout
              </Button>
            </>
          </div>
        </>
      </Modal>

      <ControlPage forShopping={forShopping} setForShopping={setForShopping} />
    </>
  );
}
