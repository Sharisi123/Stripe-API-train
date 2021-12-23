import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Payment from "./Payment";

function App() {
  return (
    <div className="App">
      <Payment />
    </div>
  );
}

export default App;
