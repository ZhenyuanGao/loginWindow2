import { useState } from "react";
import validate from "./validateinfo";
//import { Link } from "react-router-dom";
import signInScreen from "./signInScreen";
import { Input, Button } from "antd";
//import Modal from "./Modal";
import "./index.css";
export const LoginPage = ({ profile, setProfile }) => {
  const [value, setValue] = useState("");
  const [password, setpwd] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const [errors, setErrors] = useState({});
  const [passwordError, setPErrors] = useState({});

  const user = {
    email: "",
    password: "",
  };

  function addPerson() {
    if (value && password) {
      setProfile((prevstate) => {
        return [...prevstate, { account: value, password: password }];
      });
    }
  }
  function checkProfile() {
    if (profile[0].account === value && profile[0].password === password) {
      alert("your info is correct, going to a new page now");
    } else {
      alert("your info is not correct.");
    }
  }

  const changePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
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
          />
          {errors.username && <p> {errors.username}</p>}
          {errors.email && <p> {errors.email}</p>}
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
            />
            <Button id="showpassword" onClick={changePassword}>
              {" "}
              show
            </Button>
          </div>
          {passwordError.password && <p> {passwordError.password}</p>}
        </div>
      </form>
    </div>
  );
};
