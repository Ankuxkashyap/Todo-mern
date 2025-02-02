import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routers/todoRouter.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv, { config } from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
app.use(express.json());
app.use(cookieParser());
// app.use(config());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

mongoose
.connect(MONGO_URI,
{ useNewUrlParser: true, useUnifiedTopology: true },)
.then (() => {console.log("MongoDB connected")})
.catch((err) => console.log(err)); 
 
app.get("/", (req, res) => {
  res.send("worKing");
});

app.use("/todo", todoRouter);
app.use("/user", userRouter);


app.listen(PORT, () => {
  console.log("Server is running on port 3000 ...");
})