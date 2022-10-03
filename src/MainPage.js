import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { ErrorBoundary } from "react-error-boundary";

import { SignInScreen } from "./signInScreen";
export const MainPage = ({
  visible,
  setVisible,
  setIsLoggedIn,
  setOffline,
  setUserEmail,
}) => {
  const [profile, setProfile] = useState([
    { account: "kevin", password: "1234" },
  ]);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <alert>sss</alert>

        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

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
      <SignInScreen
        visible={visible}
        setVisible={setVisible}
        setIsLoggedIn={setIsLoggedIn}
        setOffline={setOffline}
        setUserEmail={setUserEmail}
      />
    </>
  );
};
