import { useState } from "react";
import validate from "./validateinfo";
import Modal from "./Modal";
import { findUser } from "./actions/index";

import { Input, Button } from "antd";

export const PasswordReset = () => {
  const [value, setValue] = useState("");

  const [errors, setErrors] = useState({});
  const [ConfirmationEmail, setConfirmationEmail] = useState(false);

  const user = {
    email: "",
    password: "",
  };
  /*
  useEffect(() => {
    async function getCustomer() {
      try {

      

        const response = await api.getCustomerApi();

       
        if (response.status === StatusCodes.OK) {
          setIsLoggedin(true);
          setIsLoading(false);
        } else if (response.status === StatusCodes.UNAUTHORIZED) {
          setIsLoggedin(false);
          setIsLoading(false);
        } else if (response.status === 500) {
          //console.log("edge case test");
          //the page is not breaking.
          //and the log in button will be forever loading.
        } else {
          console.log(response.status);
          throw new Error(
            `Get customer API response status error: ${response.status}`
          );
        }
        // setIsLoading(false);
      } catch (error) {
        throw new Error(`Get customer API error: ${JSON.stringify(error)}`);
      }
    }
    getCustomer();
    
  }, []);


*/

  async function checkbackend() {
    let result = await findUser(value);
    if (result === 200) {
      console.log("Email is in our database,send the email");
    } else {
      console.log("email does not exist");
    }
    return result;
  }

  return (
    <div className="column_gap_signin">
      <form className="form">
        <div>
          <label htmlFor="username" id="emaillabel">
            Recovery
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
            size={"large"}
          />
          <div className="email_not_empty">
            {errors.email && <p> {errors.email}</p>}
          </div>
        </div>
      </form>
      <div>
        <Button
          id="signin"
          onClick={() => {
            if (errors.email !== undefined) {
              // console.log("yo");
              throw new Error("I crashed!");
            }
            setConfirmationEmail(true);
          }}
          size={"large"}
        >
          Update Password
        </Button>
        <Modal
          titleText={"A Confirmation Email"}
          visible={ConfirmationEmail}
          setVisible={setConfirmationEmail}
        >
          <p>A confirmation email has been sent</p>
        </Modal>
      </div>
    </div>
  );
};
