const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((e) => console.error(e));

app.get("/api/test", () => {
  console.log("Test is successful");
});

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is up and running!");
});
