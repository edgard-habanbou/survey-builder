const express = require("express");
const { connectToMongoDB } = require("./configs/connection");
const app = express();
app.use(express.json());
require("dotenv").config();

// auth route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server listining on PORT: ", process.env.PORT);
  connectToMongoDB();
});
