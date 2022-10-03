import React from "react";
import { useState, useEffect } from "react";
import { Select, Image, Input, Button } from "antd";
import { addStock, modifyStock } from "./actions/index";
import { useSelector } from "react-redux";
import { addproduct, modProduct, delProduct } from "./action/index";
import { useDispatch } from "react-redux";

import "./index.css";
const { TextArea } = Input;
const { Option } = Select;
export const CreateProduct = ({
  setShowList,
  modifyProduct,
  setModifyProduct,
  setCreateProd,
  setFul_pro_check,
}) => {
  const [Prevproduct, setprevproduct] = useState({});
  const [showpic, setShowPic] = useState(true);
  const [piclink, setpiclink] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setprevproduct(JSON.parse(localStorage.getItem("myProduct")));
    console.log(Prevproduct);
  }, []);
  const product = {
    name: "",
    quantity: 0,
    price: 0,
    image: "",
    description: "",
  };

  const data = [
    {
      // id: "1",
      name: "MacBook",
      quantity: 3,
      price: 1400,
      image: "https://picsum.photos/id/180/2400/1600",
    },
    {
      //  id: "2",
      name: "Old Car",
      quantity: 33,
      price: 2400,
      image: "https://picsum.photos/id/111/4400/2656",
    },
    {
      // id: "3",
      name: "W Shoes",
      quantity: 333,
      price: 1000,
      image: "https://picsum.photos/id/21/3008/2008",
    },
  ];

  const dispatch = useDispatch();
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
  const modProductToArray = (index, link) => {
    modProduct(dispatch)({ index: index, image: link });

    //console.log(product_redux);
  };

  const delProductToArray = (index) => {
    delProduct(dispatch)({ index: index });

    //console.log(product_redux);
  };
  const getProductName = () => {
    const store_p = localStorage.getItem("myProduct");
    return JSON.parse(store_p).name;

    //console.log(product_redux);
  };
  const getProductPrice = () => {
    const store_p = localStorage.getItem("myProduct");
    return JSON.parse(store_p).price;

    //console.log(product_redux);
  };
  const getProductQuantity = () => {
    const store_p = localStorage.getItem("myProduct");
    return JSON.parse(store_p).quantity;

    //console.log(product_redux);
  };
  const getProductDescription = () => {
    const store_p = localStorage.getItem("myProduct");
    return JSON.parse(store_p).description;

    //console.log(product_redux);
  };
  const getProductImage = () => {
    const store_p = localStorage.getItem("myProduct");
    return JSON.parse(store_p).image;

    //console.log(product_redux);
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  /*

  useEffect(() => {
    addProductToArray();
  }, []);
*/
  //addProductToArray();
  const product_redux = useSelector((state) => state);
  let r_l = product_redux.length;
  //console.log(product_redux);
  /*
  let name_val;
  let price_val;
  let quantity_val;
  let description_val;
  let link_val;

  if (modifyProduct === -1) {
    name_val = null;
    price_val = null;
    quantity_val = null;
    description_val = null;
    link_val = null;
  } else {
    name_val = "4";
    price_val = null;
    quantity_val = null;
    description_val = null;
    link_val = null;
  }
*/
  if (modifyProduct === -1) {
    return (
      <>
        <div className="create_product">
          <div>
            <label id="productN" htmlFor="product">
              Product:
            </label>
            <Input
              size={"large"}
              onBlur={(e) => {
                product.name = e.target.value;
              }}
            />
          </div>
          <div>
            <label id="productD" htmlFor="product">
              Product Description:
            </label>
            <TextArea
              style={{ height: 120 }}
              placeholder={"Insert your description of product here."}
              onBlur={(e) => {
                product.description = e.target.value;
              }}
            />
          </div>

          <div className="row_qandp">
            <div>
              <label id="productQ" htmlFor="product">
                Quantity:
              </label>
              <Input
                size={"large"}
                onBlur={(e) => {
                  product.quantity = e.target.value;
                }}
              />
            </div>
            <div>
              <label id="productP" htmlFor="product">
                Price:
              </label>
              <Input
                size={"large"}
                onBlur={(e) => {
                  product.price = e.target.value;
                }}
              />
            </div>
          </div>
          <div className="row_qandp">
            <div>
              {" "}
              <Select
                size={"large"}
                defaultValue="Category1"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="old_car">Old car</Option>
                <Option value="apple">Apple</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
              </Select>
            </div>

            <div className="flex_column">
              <label id="productQ" for="url">
                Add Image Link
              </label>
              <div className="test_row">
                <div>
                  <Input
                    type="url"
                    name="url"
                    id="url"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    size="30"
                    required
                    onBlur={(e) => {
                      product.image = e.target.value;
                    }}
                    size={"large"}
                  />
                </div>
                <div>
                  <Button
                    id="preview_button"
                    onClick={() => {
                      /*
              addProductToArray(
                product.name,
                product.quantity,
                product.price,
                product.image,
                product.description
              );

              */
                      localStorage.setItem(
                        "myProduct",
                        JSON.stringify(product)
                      );

                      // console.log(product.details.description);
                      // modProductToArray(0, product.details.imagineSrc);
                      // setShowPic((prev) => !prev);
                      setVisible(true);
                      setpiclink(product.image.toString());

                      //console.log(product.details.imagineSrc);
                    }}
                    size={"large"}
                  >
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Image
            width={200}
            style={{ display: "none" }}
            src={piclink}
            preview={{
              visible,
              src: piclink,
              onVisibleChange: (value) => {
                setVisible(value);
              },
            }}
          />
          <Button
            className="add_product_button"
            onClick={() => {
              //addStock(product_redux[r_l - 1]);
              // delProductToArray(r_l - 1);
              const store_p = localStorage.getItem("myProduct");
              console.log(store_p);
              let Product = JSON.parse(store_p);
              if (
                Product &&
                Product.name &&
                Product.quantity &&
                Product.price &&
                Product.description &&
                Product.image
              ) {
                addStock(JSON.parse(store_p));
                // console.log("everything is good");
                localStorage.removeItem("myProduct");

                setShowList((prev) => !prev);
                setCreateProd((prev) => !prev);
                setFul_pro_check(false);
              } else {
                setFul_pro_check(true);
                //  console.log("something is missing");
              }
              // addStock(JSON.parse(store_p));
            }}
          >
            Add the product
          </Button>
        </div>
      </>
    );
  } else {
    // localStorage.removeItem("myProduct");
    return (
      <>
        <div className="create_product">
          <div>
            <label id="productN" htmlFor="product">
              Product:
            </label>
            <Input
              size={"large"}
              onBlur={(e) => {
                product.name = e.target.value;
              }}
              defaultValue={getProductName}
            />
          </div>
          <div>
            <label id="productD" htmlFor="product">
              Product Description:
            </label>
            <TextArea
              style={{ height: 120 }}
              placeholder={"Insert your description of product here."}
              onBlur={(e) => {
                product.description = e.target.value;
              }}
              defaultValue={getProductDescription}
            />
          </div>

          <div className="row_qandp">
            <div>
              <label id="productQ" htmlFor="product">
                Quantity:
              </label>
              <Input
                size={"large"}
                onBlur={(e) => {
                  product.quantity = e.target.value;
                }}
                defaultValue={getProductQuantity}
              />
            </div>
            <div>
              <label id="productP" htmlFor="product">
                Price:
              </label>
              <Input
                size={"large"}
                onBlur={(e) => {
                  product.price = e.target.value;
                }}
                defaultValue={getProductPrice}
              />
            </div>
          </div>
          <div className="row_qandp">
            <div>
              {" "}
              <Select
                size={"large"}
                defaultValue="Category1"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="old_car">Old car</Option>
                <Option value="apple">Apple</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
              </Select>
            </div>

            <div className="flex_column">
              <label id="productQ" for="url">
                Add Image Link
              </label>
              <div className="test_row">
                <div>
                  <Input
                    type="url"
                    name="url"
                    id="url"
                    placeholder="https://example.com"
                    pattern="https://.*"
                    size="30"
                    required
                    onBlur={(e) => {
                      product.image = e.target.value;
                    }}
                    size={"large"}
                    defaultValue={getProductImage}
                  />
                </div>
                <div>
                  <Button
                    id="preview_button"
                    onClick={() => {
                      /*
              addProductToArray(
                product.name,
                product.quantity,
                product.price,
                product.image,
                product.description
              );
              */

                      // console.log(product.details.description);
                      // modProductToArray(0, product.details.imagineSrc);
                      localStorage.setItem(
                        "myProduct",
                        JSON.stringify(product)
                      );

                      setVisible((prev) => !prev);
                      setpiclink(product.image.toString());
                      console.log(product.image.toString());
                    }}
                    size={"large"}
                  >
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Image
            width={200}
            style={{ display: "none" }}
            src={piclink}
            preview={{
              visible,
              src: piclink,
              onVisibleChange: (value) => {
                setVisible(value);
              },
            }}
          />
          <Button
            onClick={() => {
              /*
            //addStock(product_redux[r_l - 1]);
            addProductToArray(
              product.name,
              product.quantity,
              product.price,
              product.image,
              "this is a test for modifyAPI"
            );
            modifyStock(product_redux[r_l - 1]);

            console.log(product_redux[r_l - 1]);
            delProductToArray(r_l - 1);

            */

              //may be change this.

              const store_p = localStorage.getItem("myProduct");
              // console.log(store_p);
              /*
              let Product = JSON.parse(store_p);
              if (
                Product &&
                Product.name &&
                Product.quantity &&
                Product.price &&
                Product.description &&
                Product.image
              ) {

                */

              modifyStock(JSON.parse(store_p));
              localStorage.removeItem("myProduct");

              setShowList((prev) => !prev);
              setFul_pro_check(false);
              setModifyProduct(-1);

              /*
                console.log("it is good");
              } else {
                console.log("something is wrong");
                setFul_pro_check(true);
              }
              */
            }}
          >
            Modify the product
          </Button>
        </div>
      </>
    );
  }
};
