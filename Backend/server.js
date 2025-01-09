require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//connect to mongodb
const { connectToMongoose } = require("./config/db");

//middlewares
//express json parser middleware
app.use(express.json());

//cors middleware
// const { corsProOptions } = require("./config/corsConfig");
app.use(cors());


//users Router
const usersRoute = require("./routes/usersRoutes");
app.use("/api/users", usersRoute);

//admins Router
const adminsRoute = require("./routes/adminRoutes");
app.use("/api/admins", adminsRoute);

//account Router
const accountRoute = require("./routes/accountRoutes");
app.use("/api/account", accountRoute);

//account requests Router
const accountRequestRoute = require("./routes/accountRequestRoutes");
app.use("/api/request", accountRequestRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
}
);

//serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "Frontend", "dist", "index.html")
    )
  );
}

const getToken = async () => {
  const consumer_key = "L7Tt0YnuxqNJkzaV5O6C9JUGKY1Ga1hctYytNeDCqjcPm1lq";
  const consumer_secret = "YEhWMayqsAiomlDTV2VcEa8fnrWyahnDHg5rvmmpecZdMO1NiUB9kUxA1bstAAZL";
  const auth = `Basic ${Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64")}`;
  const TOKEN_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  try {
    console.log("getting token");
    const response = await axios.get(TOKEN_URL, { headers: { Authorization: auth } });
    console.log(response.data);
    const { access_token } = response.data;
    return access_token;  
  } catch (error) {
    console.error(error);
  }
}

const  business_shortcode = 174379
const passkey = "1234AsEn"

const generatePassword = () => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
  const password = Buffer.from(`${business_shortcode}${passkey}${timestamp}`).toString
  return { password, timestamp };
}

app.get("/api/mpesa", async (req, res) => {
  const { amount, PhoneNumber } = req.query;
  const phone_number = PhoneNumber || "254113159363";
  // const amount = 100;
  const token = await getToken();
  if (token === null) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  console.log(token);

  try {
    const request_data = {
      "BusinessShortCode": "174379",
      "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQxMjMxMDk1MTM5",
      "Timestamp": "20241231095139",
      "TransactionType": "CustomerPayBillOnline",
      "Amount": 100,
      "PartyA": "254113159363",
      "PartyB": "174379",
      "PhoneNumber":PhoneNumber,
      "CallBackURL": "https://mydomain.com/path",
      "AccountReference": "Azanona",
      "TransactionDesc": "Test Payment"
  }
  

  const STK_PUSH_URL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  console.log(PhoneNumber);

    const headers = {"Authorization": `Bearer ${token}`}
    const response = await axios.post(STK_PUSH_URL, request_data, { headers });
    // console.log(response.data);

    // return res.json(response.data);

  } catch (error) {
    console.error(error);
  }

  res.send(token);
});



connectToMongoose()
  .then(() => {
    app.listen(process.env.PORT || 5072, () => {
      console.log("server is running on https://e-banking-backend.onrender.com");
    });
  })
  .catch((err) => {
    console.log(err);
  });
