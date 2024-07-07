// new 10/22/2023
// const products = require("./data/products");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const uploadRoute = require("./routes/uploadRoutes");
const orderRoute = require("./routes/orderRoute");
const brandRoute = require("./routes/brandRoute");
const categoryRoute = require("./routes/CategoryRoute");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const httpStatusText = require("./utils/httpStatusText");
const paypalService = require("./utils/paypalService");
const app = express();
const path = require("path");

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const corsoptions = {
  //to allow requests from client
  origin: [
    "http://192.168.1.10:5173",
    "192.168.1.6",
    "http://192.168.1.10",
    "http://localhost:3001",
    "http://127.0.0.1",
    "http://104.142.122.231",
    "http://localhost:5173",
    "https://techsouq.vercel.app",
    "https://techsouq-git-main-hamdyyemads-projects.vercel.app",
    "https://techsouq-git-main-hamdyyemads-projects.vercel.app",
    "http://techsouq.vercel.app",
    "http://techsouq-git-main-hamdyyemads-projects.vercel.app",
    "http://techsouq-git-main-hamdyyemads-projects.vercel.app",
  ],
  optionsSuccessStatus: 200,
  credentials: true,
  exposedheaders: ["set-cookie", "Set-cookie"],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
};
app.use(cors(corsoptions));

const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("dotenv").config();
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("Db connect success");
});

app.use("/", userRoute);
app.use("/", productRoute);
app.use("/", orderRoute);
app.use("/", uploadRoute);
app.use("/", brandRoute);
app.use("/", categoryRoute);

// app.get("/config/paypal", async (req, res) => {
//   try {
//     const clientId = process.env.PAYPAL_CLIENT_ID;
//     const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

//     const balance = await paypalService.getPayPalAccountBalance(
//       clientId,
//       clientSecret
//     );
//     // const transactions = await paypalService.getPayPalTransactions(
//     //   clientId,
//     //   clientSecret
//     // );
//     res.send({ clientId, balance });
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ status: httpStatusText.ERROR, message: "Internal Server Error" });
//   }
// });
app.get("/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: httpStatusText.ERROR, message: "That page doesn't exist" });
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`server run on port ${process.env.PORT}`);
});
