import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const response = await fetch(
          "http://localhost:5000/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalAmount * 100 }), // Replace with your amount in cents
          }
        );

        const { clientSecret } = await response.json();

        const confirm = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (confirm.paymentIntent.status === "succeeded") {
          setPaymentStatus("Payment Successful!");
        } else {
          setPaymentStatus("Payment Failed.");
        }
      } catch (error) {
        setPaymentStatus(`Payment Error: ${error.message}`);
      }
    } else {
      setPaymentStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div
      className="checkout-form"
      style={{
        width: "500px",
        height: "250px",
        borderRadius: "10px",
        boxShadow: "0 0 4px black",
        padding: "10px",
      }}
    >
      
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <CardElement
          options={{
            style: {
              base: {
                width: "100px", // Set width to 100% or a fixed width like '300px'
                height: "50px", // Set height as needed
                fontSize: "26px", // Optional: Set font size for better readability
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe}
          style={{
            padding: "10px",
            backgroundColor: "rgb(10, 114, 250)",
            fontSize: "16px",
            width: "fit-content",
            border: "none",
            borderRadius: "5px",
            color: "white",
            alignSelf: "center",
          }}
        >
          Pay ₹{totalAmount}
        </button>
        <p
          className="paymentStatus"
          style={{ textAlign: "center", fontSize: "24px" }}
        >
          {paymentStatus}
        </p>
      </form>
    </div>
  );
};

export default CheckoutForm;
