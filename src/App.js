import React, { useState } from "react";
import "./pinForm.css";
import "./pinDetail.css";
import "material-icons/iconfont/material-icons.css";
import PincodeForm from "./Components/PincodeForm";
import PincodeDetails from "./Components/PincodeDetails";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [pincode,setPincode] = useState("");

  function handleSubmit(pincode){
    setPincode(pincode);
  }

  return (
      <Routes>
        <Route path="/" element={<PincodeForm onSubmit={handleSubmit} />} />
        <Route path="/pincodeDetails" element={<PincodeDetails pincode={pincode} />}/>
      </Routes>
  );
}

export default App;