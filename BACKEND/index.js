const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const { connectToMongoDB } = require("./dbConnect");
const authRoute = require("./routes/auth.routes");
const todoRoute = require("./routes/todo.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true, 
}));

connectToMongoDB(process.env.mongoDB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/auth", authRoute);
app.use("/api/todos", todoRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
