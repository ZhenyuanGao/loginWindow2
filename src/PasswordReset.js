import { useState } from "react";
import validate from "./validateinfo";
import Modal from "./Modal";

import { Input, Button } from "antd";

export const PasswordReset = () => {
  const [value, setValue] = useState("");

  const [errors, setErrors] = useState({});
  const [ConfirmationEmail, setConfirmationEmail] = useState(false);

  const user = {
    email: "",
    password: "",
  };

  return (
    <div>
      <form className="form">
        <div>
          <label htmlFor="username">
            Enter your email link, we will send you the recovery link
          </label>
          <Input
            id="username"
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
      </form>
      <div>
        <Button onClick={() => setConfirmationEmail(true)}>
          Update Password
        </Button>
        <Modal
          titleText={"A Confirmation Email has been sent to your email address"}
          visible={ConfirmationEmail}
          setVisible={setConfirmationEmail}
        >
          {}
        </Modal>
      </div>
    </div>
  );
};
