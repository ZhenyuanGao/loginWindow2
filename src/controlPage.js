import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { MainPage } from "./MainPage";
import { CreateProduct } from "./CreateProductPage";
import data from "./data";
//import { Product } from "./Product";
import { getCart } from "./actions/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ProductListView from "./ProductListView";
import Display from "./Display";
import Cookies from "js-cookie";
import { addproduct, delProduct } from "./action/index";

import {
  PageHeader,
  Button,
  Descriptions,
  Layout,
  Menu,
  Breadcrumb,
} from "antd";
import { Input } from "antd";

import {
  YoutubeOutlined,
  ShoppingCartOutlined,
  TwitterOutlined,
  FacebookOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
export default function ControlPage({ forShopping, setForShopping }) {
  const { products } = data;
  const [visible, setVisible] = useState(true);
  const [islogedIn, setIsLoggedIn] = useState(false);
  const [showList, setShowList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetail, setIsDetail] = useState(-1);
  const [modifyProduct, setModifyProduct] = useState(-1);
  const [offline, setOffline] = useState(false);
  const [createProd, setCreateProd] = useState(false);
  const product_redux = useSelector((state) => state);
  const [ful_pro_check, setFul_pro_check] = useState(false);
  //const [newArr, setNewArr] = useState([]);
  const [useremail, setUserEmail] = useState(false);

  /*
  useEffect(() => {
   
// const redux_array = useSelector((state)=>state)
..
    async function getData() {
     

      const abc = await getCart({ email: localStorage.getItem("currentUser") });
      if (useremail === true) {
        console.log("do things here");
      }
     
      if (abc.length != 0) {
        // let array = JSON.parse(arr);
        console.log("I got run here");
        abc.map((item) => {
          addProductToArray(item.name, item.quantity, item.price, item.image);
        });
      }
    }
    getData();
    return;
  }, []);
*/

  useEffect(() => {
    // console.log(localStorage.getItem("currentUser"));
    let a = product_redux.length;
    for (let i = 0; i < a; i++) {
      delProductToArray(0);
    }
    async function getData() {
      let a = product_redux.length;
      for (let i = 0; i < a; i++) {
        delProductToArray(0);
      }
      const abc = await getCart({ email: localStorage.getItem("currentUser") });

      if (useremail === true) {
        console.log("do things here");
      }

      if (abc.length != 0) {
        // let array = JSON.parse(arr);

        abc.map((item) => {
          addProductToArray(item.name, item.quantity, item.price, item.image);
        });
      }
    }
    getData();
  }, [localStorage.getItem("currentUser")]);

  //this above code could be commented out if things start to go out of hand.

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

  const delProductToArray = (index) => {
    delProduct(dispatch)({ index: index });

    //console.log(product_redux);
  };

  const onSearch = (value) => console.log(value);

  const removeCookie = () => {
    Cookies.remove("user");
  };
  //const product_redux_app = useSelector((state) => state);

  if (isLoading === true) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  } else if (offline === true && isDetail > 0) {
    return (
      <>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={true}
            title="Management Chuwa"
            extra={[
              <Search
                className="anmoyous"
                placeholder="input search text"
                onSearch={onSearch}
                enterButton
              />,
              <a
                key="3"
                onClick={() => {
                  setOffline(false);
                }}
              >
                Back to the login page{" "}
              </a>,
            ]}
          >
            {" "}
            <Descriptions size="large" column={3}></Descriptions>
          </PageHeader>
        </div>
        <Display
          isDetail={isDetail}
          setIsDetail={setIsDetail}
          offline={offline}
          setOffline={setOffline}
        />{" "}
        <div>
          <Footer className="footer">
            <>
              <div>
                <p>@2022 all rights reserved</p>
              </div>
              <div className="row">
                {" "}
                <YoutubeOutlined />
                <TwitterOutlined />
                <FacebookOutlined />
              </div>
              <div className="row">
                <a>Contact us</a>
                <a>Privacy Policies</a>
                <a>Help</a>
              </div>
            </>
          </Footer>
        </div>
      </>
    );
  } else if (islogedIn === false && showList === true && offline === false) {
    return (
      <>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={true}
            title="Management Chuwa"
            extra={[
              <Input placeholder=""></Input>,
              <a
                key="3"
                onClick={() => {
                  setVisible(true);
                }}
              >
                Sign In
              </a>,
              <ShoppingCartOutlined
                width="3"
                onClick={() => setForShopping(true)}
              />,
              <a key="1" type="primary" onClick={() => setForShopping(true)}>
                current value in shopping cart
              </a>,
              <div> $</div>,
            ]}
          >
            {" "}
            <Descriptions size="large" column={3}></Descriptions>
          </PageHeader>
        </div>
        <div>
          <Modal
            titleText={"Sign into your account"}
            visible={visible}
            setVisible={setVisible}
          >
            <MainPage
              visible={visible}
              setvisible={setVisible}
              setIsLoggedIn={setIsLoggedIn}
              setOffline={setOffline}
              setUserEmail={setUserEmail}
            />
          </Modal>
        </div>
        <div>
          <Footer className="footer">
            <>
              <div>
                <p>@2022 all rights reserved</p>
              </div>
              <div className="row">
                {" "}
                <YoutubeOutlined />
                <TwitterOutlined />
                <FacebookOutlined />
              </div>
              <div className="row">
                <a>Contact us</a>
                <a>Privacy Policies</a>
                <a>Help</a>
              </div>
            </>
          </Footer>
        </div>
      </>
    );
  } else if (islogedIn === false && offline === true) {
    return (
      <>
        <Layout className="newContainer">
          <div className="site-page-header-ghost-wrapper">
            <PageHeader
              ghost={true}
              title="Management Chuwa"
              extra={[
                <Search
                  className="anmoyous"
                  placeholder="input search text"
                  onSearch={onSearch}
                  enterButton
                />,
                <a
                  key="3"
                  onClick={() => {
                    setOffline(false);
                  }}
                >
                  Back to the login page{" "}
                </a>,
              ]}
            >
              {" "}
              <Descriptions size="large" column={3}></Descriptions>
            </PageHeader>
          </div>
          <div className="bbody">
            <ProductListView
              setIsLoading={setIsLoading}
              setIsDetail={setIsDetail}
              setShowList={setShowList}
              offline={offline}
              setOffline={setOffline}
            />
          </div>
          <div>
            <Footer className="footer">
              <>
                <div>
                  <p>@2022 all rights reserved</p>
                </div>
                <div className="row">
                  {" "}
                  <YoutubeOutlined />
                  <TwitterOutlined />
                  <FacebookOutlined />
                </div>
                <div className="row">
                  <a>Contact us</a>
                  <a>Privacy Policies</a>
                  <a>Help</a>
                </div>
              </>
            </Footer>
          </div>
        </Layout>
      </>
    );
  } else if (isDetail >= 0) {
    // let arrayIndex = product_redux_app[0].index;

    return (
      <>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={true}
            title="Management Chuwa"
            extra={[
              <Input placeholder=""></Input>,
              <a
                key="3"
                onClick={() => {
                  setIsLoggedIn(false);
                  removeCookie();
                  //localStorage.removeItem("currentUser");
                }}
              >
                Sign out
              </a>,
              <ShoppingCartOutlined onClick={() => setForShopping(true)} />,
              <a key="1" type="primary" onClick={() => setForShopping(true)}>
                current value in shopping cart
              </a>,
              <div>
                {" "}
                $
                {product_redux.reduce((previousV, product) => {
                  previousV += product.price * product.quantity;
                  return previousV;
                }, 0)}{" "}
              </div>,
            ]}
          >
            {" "}
            <Descriptions size="large" column={3}></Descriptions>
          </PageHeader>
        </div>
        <Display
          isDetail={isDetail}
          setIsDetail={setIsDetail}
          offline={offline}
          setOffline={setOffline}
          setForShopping={setForShopping}
        />{" "}
        <div>
          <Footer className="footer">
            <>
              <div>
                <p>@2022 all rights reserved</p>
              </div>
              <div className="row">
                {" "}
                <YoutubeOutlined />
                <TwitterOutlined />
                <FacebookOutlined />
              </div>
              <div className="row">
                <a>Contact us</a>
                <a>Privacy Policies</a>
                <a>Help</a>
              </div>
            </>
          </Footer>
        </div>
      </>
    );
  } else if (islogedIn === true && showList === false) {
    return (
      <>
        {" "}
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={true}
            title="Management Chuwa"
            extra={[
              <a onClick={() => setCreateProd(true)}>Create a product</a>,
              <a
                onClick={() => {
                  setShowList((prev) => !prev);
                  setModifyProduct(-1);
                }}
              >
                Back to the Stock
              </a>,
              <a
                key="3"
                onClick={() => {
                  setIsLoggedIn(false);
                  removeCookie();
                  //localStorage.removeItem("currentUser");
                }}
              >
                Sign out
              </a>,
              <ShoppingCartOutlined onClick={() => setForShopping(true)} />,
              <a key="1" type="primary">
                Current value in shopping cart
              </a>,
              <div>
                {" "}
                $
                {product_redux.reduce((previousV, product) => {
                  previousV += product.price * product.quantity;
                  return previousV;
                }, 0)}{" "}
              </div>,
            ]}
          >
            {" "}
            <Descriptions size="large" column={3}></Descriptions>
          </PageHeader>
        </div>
        {modifyProduct === -1 ? (
          <div>
            <Modal
              titleText={"Create the product"}
              visible={createProd}
              setVisible={setCreateProd}
            >
              <CreateProduct
                setShowList={setShowList}
                modifyProduct={modifyProduct}
                setModifyProduct={setModifyProduct}
                setCreateProd={setCreateProd}
                setFul_pro_check={setFul_pro_check}
              />
              {ful_pro_check ? (
                <p>There is empty fields, please fill them</p>
              ) : null}
            </Modal>
          </div>
        ) : (
          <div>
            <Modal
              titleText={"Modify the product"}
              visible={createProd}
              setVisible={setCreateProd}
            >
              <CreateProduct
                setShowList={setShowList}
                modifyProduct={modifyProduct}
                setModifyProduct={setModifyProduct}
                setCreateProd={setCreateProd}
                setFul_pro_check={setFul_pro_check}
              />
              {ful_pro_check ? (
                <p>There is empty fields, please fill them</p>
              ) : null}
            </Modal>
          </div>
        )}
        <div>
          <Footer className="footer">
            <>
              <div>
                <p>@2022 all rights reserved</p>
              </div>
              <div className="row">
                {" "}
                <YoutubeOutlined />
                <TwitterOutlined />
                <FacebookOutlined />
              </div>
              <div className="row">
                <a>Contact us</a>
                <a>Privacy Policies</a>
                <a>Help</a>
              </div>
            </>
          </Footer>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={true}
            title="Management Chuwa"
            extra={[
              <Input placeholder=""></Input>,
              <a
                key="3"
                onClick={() => {
                  setIsLoggedIn(false);
                  removeCookie();
                  //localStorage.removeItem("currentUser");
                }}
              >
                Sign out
              </a>,
              <ShoppingCartOutlined onClick={() => setForShopping(true)} />,
              <a key="1" type="primary" onClick={() => setForShopping(true)}>
                current value in shopping cart
              </a>,
              <div>
                {" "}
                $
                {product_redux.reduce((previousV, product) => {
                  previousV += product.price * product.quantity;
                  return previousV;
                }, 0)}{" "}
              </div>,
            ]}
          >
            {" "}
            <Descriptions size="large" column={3}></Descriptions>
          </PageHeader>
        </div>
        <div className="two_buttons">
          <h2 className="title">Products</h2>
          <Button
            className="add_Product"
            onClick={() => {
              setShowList((prev) => !prev);
              setCreateProd(true);
            }}
          >
            Add Product
          </Button>
        </div>
        <ProductListView
          setIsLoading={setIsLoading}
          setIsDetail={setIsDetail}
          setShowList={setShowList}
          setModifyProduct={setModifyProduct}
          setCreateProd={setCreateProd}
        />
        <div>
          <Footer className="footer">
            <>
              <div>
                <p>@2022 all rights reserved</p>
              </div>
              <div className="row">
                {" "}
                <YoutubeOutlined />
                <TwitterOutlined />
                <FacebookOutlined />
              </div>
              <div className="row">
                <a>Contact us</a>
                <a>Privacy Policies</a>
                <a>Help</a>
              </div>
            </>
          </Footer>
        </div>
      </>
    );
  }
}

//case one goes here.
/*
  <ProductListView
          setIsLoading={setIsLoading}
          setIsDetail={setIsDetail}
          setShowList={setShowList}
          setModifyProduct={setModifyProduct}
        />
*/
