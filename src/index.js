import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProductProvider } from "./data/ProductContext";
import TagManager from "react-gtm-module";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const tagManagerArgs = {
  gtmId: "GTM-KDF9MFT4",
};

const stripePromise = loadStripe(
  "pk_test_51QMLZZD325VV0gx4dDA3gcxdvpiItnJzmAkC7Ev55ljNlV4U3AGS78VD7o8O28aQViZ4Y2jbfwz2BV8peE4IEFGM00hVsRPV2j"
);

TagManager.initialize(tagManagerArgs);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductProvider>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </ProductProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
