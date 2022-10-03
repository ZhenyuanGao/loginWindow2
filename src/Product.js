import React from "react";
import { useState, useEffect } from "react";
import { addproduct, delProduct, modProductQ } from "./action/index";
import { modifyUser, deleteCart, modifyCartQ } from "./actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PageHeader, Button, Descriptions, Card, Typography } from "antd";
import "./quantitybutton.css";
import "./index.css";
import { CheckOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title } = Typography;
export function Product(props) {
  const dispatch = useDispatch();
  const [addItem, setAddItem] = useState(false);
  const [increment, setIncrement] = useState(0);
  const [checkOutval, setCheckOutval] = useState(0);

  const { product } = props;
  let maxQuant = product.quantity;
  /*
  const CallshowDetails = (boolToShow, index) => {
    showDetails(dispatch)({
      boolToShow: boolToShow,
      index: index,
    });

    //console.log(product_redux);
  };
  */

  useEffect(() => {
    setCheckOutval(product.quantity);
  }, []);

  function increase() {
    //props.quant = increment;
    // console.log(props.index);

    if (increment >= maxQuant) {
      setIncrement(maxQuant);
    } else {
      setIncrement(increment + 1);
    }
  }
  const modProductToArrayQ = (index, quantity) => {
    modProductQ(dispatch)({ index: index, quantity: quantity });

    //console.log(product_redux);
  };

  const delProductToArray = (index) => {
    delProduct(dispatch)({ index: index });

    //console.log(product_redux);
  };

  function decrease() {
    if (increment > 0) {
      setIncrement(increment - 1);
    } else {
      setIncrement(0);
    }
  }

  function decreaseCheckout() {
    if (checkOutval > 0) {
      setCheckOutval(checkOutval - 1);
    } else {
      setCheckOutval(0);
    }
  }

  function increaseCheckout() {
    setCheckOutval(checkOutval + 1);
  }

  const addProductToArray = (name, quantity, price, image, description) => {
    addproduct(dispatch)({
      name: name,
      quantity: quantity,
      price: price,
      image: image,
      description: description,
    });
    // modProduct(dispatch)({ index: 0, image: "lol" });

    //console.log(product_redux);
  };
  const product_redux_app = useSelector((state) => state);
  if (props.finalCheckout === true) {
    return (
      <div className="item">
        <div>
          <Card
            hoverable
            style={{ width: 440 }}
            bordered={true}
            cover={
              <img
                className="picture_shopping"
                alt={product.name}
                src={product.image}
                onDoubleClick={() => {
                  // setShowDetails(true);
                  // CallshowDetails(true, props.index);
                  props.setIsDetail(props.index);
                  localStorage.setItem(
                    "indexDetailView",
                    JSON.stringify(increment)
                  );

                  // props.setOffline(false);

                  //  console.log(props.index);
                }}
              />
            }
          >
            <Meta title={<Title level={2}>{product.name}</Title>} />
            <div className="actual_total">
              <p>Quantity is shopping cart is:</p>
              {product.quantity}
            </div>

            <div className="actual_total">
              {" "}
              <p>Item price is:</p>${product.price}
            </div>
            <div className="actual_total">
              {" "}
              <p>Item total is:</p>${product.price * product.quantity}
            </div>
            <div className="two_buttons">
              <Button
                onClick={() => {
                  console.log(props.index);
                  console.log(product_redux_app[props.index].name);

                  delProductToArray(props.index);
                  // product_redux_app.splice(props.index, 1);
                  console.log(props.index);
                  deleteCart({
                    email: localStorage.getItem("currentUser"),
                    index: props.index,
                  });
                }}
              >
                Remove
              </Button>

              <div className="quantity-input">
                <button
                  className="quantity-input__modifier quantity-input__modifier--left"
                  onClick={() => {
                    decreaseCheckout();
                    modProductToArrayQ(props.index, checkOutval - 1);
                    // modProductToArrayQuantity(len_r, increment);
                    modifyCartQ({
                      email: localStorage.getItem("currentUser"),
                      index: props.index,
                      valueQ: checkOutval - 1,
                    });
                  }}
                >
                  &mdash;
                </button>
                <input
                  className="quantity-input__screen"
                  type="text"
                  value={checkOutval}
                  readOnly
                />
                <button
                  className="quantity-input__modifier quantity-input__modifier--right"
                  onClick={() => {
                    increaseCheckout();
                    // product_redux_app[props.index].quantity += 1;
                    modProductToArrayQ(props.index, checkOutval + 1);
                    modifyCartQ({
                      email: localStorage.getItem("currentUser"),
                      index: props.index,
                      valueQ: checkOutval + 1,
                    });
                    // modProductToArrayQuantity(len_r, increment);
                  }}
                >
                  &#xff0b;
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  } else {
    return (
      <div className="item">
        <div className="cardwrapper">
          <Card
            hoverable
            style={{ width: 240 }}
            bordered={true}
            cover={
              <img
                className="picture"
                alt={product.name}
                src={product.image}
                onDoubleClick={() => {
                  // setShowDetails(true);
                  // CallshowDetails(true, props.index);
                  props.setIsDetail(props.index);
                  localStorage.setItem(
                    "indexDetailView",
                    JSON.stringify(increment)
                  );

                  // props.setOffline(false);

                  //  console.log(props.index);
                }}
              />
            }
          >
            <Meta title={product.name} />

            <div className="two_buttons">
              <p>Price:</p> ${product.price}
            </div>
            <div className="two_buttons">
              <p>Quantity:</p> {product.quantity}
            </div>

            {!props.offline ? (
              <div className="flex-row">
                {" "}
                <div className="two_buttons">
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
                          console.log("increase");
                          // modProductToArrayQuantity(len_r, increment);
                        }}
                      >
                        &#xff0b;
                      </button>
                    </div>
                  </div>

                  <>
                    <Button
                      onClick={() => {
                        console.log(product._id);
                        // console.log(product_redux_app);
                        let addNewElement = true;
                        for (let i = 0; i < product_redux_app.length; i++) {
                          if (product_redux_app[i].name === product.name) {
                            addNewElement = false;
                            product_redux_app[i].quantity += increment;
                            break;
                          }
                        }
                        if (addNewElement === true) {
                          addProductToArray(
                            product.name,
                            increment,
                            product.price,
                            product.image,
                            product.description
                          );
                          // modifyUser("kegao@wesmo.edu")
                        }

                        modifyUser({
                          email: localStorage.getItem("currentUser"),
                          name: product.name,
                          quantity: increment,
                          price: product.price,
                          image: product.image,
                        });

                        //setAddItem(true);
                      }}
                    >
                      {" "}
                      add
                    </Button>
                  </>

                  <div></div>
                  <Button
                    onClick={() => {
                      props.setShowList(false);
                      props.setModifyProduct(props.index);
                      props.setCreateProd(true);
                      //console.log(product_redux_app);

                      localStorage.setItem(
                        "myProduct",
                        JSON.stringify(product)
                      );
                    }}
                  >
                    {" "}
                    edit
                  </Button>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    );
  }
}
