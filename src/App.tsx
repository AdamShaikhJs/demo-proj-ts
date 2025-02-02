import React, { useState } from "react";
import "./App.css";
import { DATA } from "./constant/ConstantData";
import MyForm from "./component/Form";
import MyForm2 from "./component/FormValid";

function App() {
  return (
    <>
      <h1>Typescript Basics</h1>
      <h6>maps static data cheking all the daat</h6>
      {DATA && DATA.map((val, i) => <p key={i}>{val.name}</p>)}
      <hr/>
      <MyForm/>
      <hr/>
      <MyForm2/>
    </>
  );
}

export default App;
