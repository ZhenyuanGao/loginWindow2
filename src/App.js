//import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import { Header } from "./header";
import { Button } from "antd";
//import Modal from "./Modal";
import { MainPage } from "./MainPage";
//import TextInput from "./textinput";
function App() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div>
        <Header />
        <MainPage visible={visible} setvisible={setVisible} />
      </div>
    </>
  );
}

export default App;

/**
 * <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <button onClick={console.log(value)}> click me</button>
    </div>
 */
