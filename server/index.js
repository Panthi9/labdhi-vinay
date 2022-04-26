import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51KsV96SJINhNLhDFA2wzyCn5n9We2iaud8gm6MvI5np09eQX3DZOpzRc0D8xXu1PzEfZx1LBPNvlCQlMyT34WRhv00ePRdTiYB";
const SECRET_KEY = "sk_test_51KsV96SJINhNLhDF3GNoDg4YoO2OrNf9e2oouEfaV0O4nbqHBhIt0jzQJZeoqwtgwvHPZekrIo7zhi1Aw4xTx84o00GGrfH1EE";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log("=== create-payment-intent");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, 
      currency: "usd",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log("===",e.message);
    res.json({ error: e.message });
  }
});
