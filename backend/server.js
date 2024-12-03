const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe(
  "sk_test_51QMLZZD325VV0gx4bno7fnW3wx95VtZIUbJDhkaGJYC7KD8I254Wwrf9R65JP9uVL5cI8MJVmUv1xgcQKDjY6xzG00eFmNA9rx"
); // Replace with your secret key

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency: "usd",
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
