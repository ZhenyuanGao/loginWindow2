import { useState } from "react";
import validate from "./validateinfo";
import { Input, Button } from "antd";
import { addUser } from "./actions/index";

//import Modal from "./Modal";
import "./index.css";

export const SignUpScreen = ({}) => {
  const [value, setValue] = useState("");
  const [password, setpwd] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const [errors, setErrors] = useState({});
  const [passwordError, setPErrors] = useState({});

  const user = {
    email: "",
    password: "",
  };

  const changePassword = () => {
    setPasswordShown(!passwordShown);
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
                  // console.log(user.email);
                  setErrors(validate(user));
                  //console.log(errors);
                  setValue(e.target.value);
                }}
                size={"large"}
              />
              <div className="email_not_empty">
                {" "}
                {errors.email && <p> {errors.email}</p>}
              </div>
            </div>

            <div>
              <label id="passwordlabel">PASSWORD</label>
              <div>
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
                {passwordError.password && <p> {passwordError.password}</p>}
              </div>
            </div>
          </form>
        </div>
        <div>
          <Button
            id="signin"
            onClick={() => {
              // console.log(value);
              //console.log(user.password);
              addUser({ email: value, password: password });
              //  findUser({ email: "keddd@gmail.com", password: "1234" });
            }}
            size={"large"}
          >
            Create Account
          </Button>
        </div>
      </div>
    </>
  );
};
