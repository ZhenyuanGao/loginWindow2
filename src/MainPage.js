import React from "react";
import { useState, useEffect } from "react";
import { LoginPage } from "./loginpage";
import Modal from "./Modal";
import { Button } from "antd";
import { PasswordReset } from "./PasswordReset";
import { addUser } from "./actions/index";
export const MainPage = ({ visible, setVisible }) => {
  const [profile, setProfile] = useState([
    { account: "kevin", password: "1234" },
  ]);

  const [forgetPwd, setforgetPwd] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [signIn, setSignin] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  /*
  return (
    <div >
      {matches && (<h1>Big Screen</h1>)}
      {!matches && (<h3>Small Screen</h3>)}
    </div>
  );
}
*/
  return (
    <>
      <Modal
        titleText={"Sign into your account"}
        visible={visible}
        setVisible={setVisible}
      >
        <LoginPage profile={profile} setProfile={setProfile} />

        <div>
          <Button id="signin"> Sign in </Button>
        </div>
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
            <LoginPage profile={profile} setProfile={setProfile} />
            <Button
              onClick={() =>
                addUser({ email: "keddd@gl.com", password: "123sss4" })
              }
            >
              Create Account
            </Button>
          </Modal>
        </div>

        <div>
          <div id="forget">
            <a onClick={() => setforgetPwd(true)}> forget Password</a>
          </div>

          <Modal
            titleText={"Update your password"}
            visible={forgetPwd}
            setVisible={setforgetPwd}
          >
            <PasswordReset />
          </Modal>
        </div>
      </Modal>
    </>
  );
};
