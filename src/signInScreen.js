import React from "react";

import { useState, useEffect } from "react";
import validate from "./validateinfo";
import { Input, Button } from "antd";
import Modal from "./Modal";
//import { LoginPage } from "./loginpage";
import { PasswordReset } from "./PasswordReset";
//import { LoginPage } from "./loginpage";
import { SignUpScreen } from "./SignUpScreen";
import { logInUser } from "./actions/index";
//import { addUser, getUser } from "./actions/index";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./index.css";

export const SignInScreen = ({
  visible,
  setVisible,
  setIsLoggedIn,
  setOffline,
  setUserEmail,
}) => {
  const [value, setValue] = useState("");
  const [password, setpwd] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [forgetPwd, setforgetPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordError, setPErrors] = useState({});
  const [signup, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [logInError, setLogInError] = useState(false);
  //const product_redux = useSelector((state) => state);

  const user = {
    email: "",
    password: "",
  };
  //const dispatch = useDispatch();

  const readCookie = () => {
    const user = Cookies.get("user");
    // console.log("i called read COokie");
    if (user) {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    readCookie();
    // const array = localStorage.getItem("myShoppingList");
    //product_redux = JSON.parse(array);
    //console.log("the value of productredux is current");
  }, []);
  const changePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const LogIN = async (email, password) => {
    let a = await logInUser({ email: email, password: password });

    return a;
  };
  return (
    <>
      <div className="column_gap_signin">
        <div>
          <form className="form">
            <div>
              <label id="emaillabel" htmlFor="username">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="email goes here"
                value={value}
                onChange={(e) => {
                  user.email = e.target.value;
                  setErrors(validate(user));
                  //console.log(errors);
                  setValue(e.target.value);
                }}
                size={"large"}
              />
              <div className="email_not_empty">
                {errors.email && <p> {errors.email}</p>}
              </div>
            </div>

            <div>
              <label id="passwordlabel">PASSWORD</label>
              <div className="password_show">
                <Input
                  id="password"
                  placeholder="password goes here"
                  type={passwordShown ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    user.password = e.target.value;

                    setPErrors(validate(user));
                    // console.log(user.email);
                    //console.log(user.password);

                    setpwd(e.target.value);
                  }}
                  size={"large"}
                />
                <Button
                  id="showpassword"
                  onClick={changePassword}
                  size={"large"}
                >
                  {" "}
                  show
                </Button>
              </div>
              <div className="password_not_empty">
                {" "}
                {passwordError.password && <p> {passwordError.password}</p>}
              </div>
            </div>
          </form>
        </div>
        <div>
          <Button
            id="signin"
            onClick={async () =>
              //logInUser({ email: "keddd@gmail.com", password: "1234" })
              {
                setLogInError(false);

                if (
                  validate({ email: value, password: password }).full_check ===
                  true
                ) {
                  //getUser();
                  let a = await LogIN(value, password);
                  console.log("a is" + a);
                  if (a === "200") {
                    //console.log("a is i got run");

                    setSignIn((prev) => !prev);
                    setIsLoggedIn(true);
                    Cookies.set("user", "loginTrue");
                    localStorage.setItem("currentUser", value);
                    setUserEmail(true);
                  } else if (a === "error") {
                    setLogInError(true);
                  }
                } else {
                  console.log(
                    "no data would be submitted if the data you inserted is not good."
                  );
                }
              }
            }
            size={"large"}
          >
            Sign in
          </Button>
          {logInError ? (
            <h1>
              we are unable to find you in our database, check your email and
              password
            </h1>
          ) : null}
        </div>

        <div className="two_buttons">
          <div>
            {" "}
            <a id="setSignup" onClick={() => setSignUp(true)}>
              {" "}
              Sign up{" "}
            </a>
            <Modal
              titleText={"Sign up your account"}
              visible={signup}
              setVisible={setSignUp}
            >
              <SignUpScreen />
            </Modal>
          </div>
          <a
            onClick={() => {
              setIsLoggedIn(false);
              setOffline(true);
            }}
          >
            Stay log out
          </a>
          <div className="for">
            <div id="forget">
              <a onClick={() => setforgetPwd(true)}> Forget Password</a>
            </div>

            <Modal
              titleText={"Update your password"}
              visible={forgetPwd}
              setVisible={setforgetPwd}
            >
              <PasswordReset />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
