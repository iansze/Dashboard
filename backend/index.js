import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import OracleDB from "oracledb";
import usersRouter from "./routes/users.route.js";
import productsRouter from "./routes/products.route.js";
import ordersRouter from "./routes/orders.route.js";
import calendarRouter from "./routes/calendar.route.js";
import authRouter from "./routes/auth.route.js";
import path from "path";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

export async function connectToDatabase() {
  try {
    const connection = await OracleDB.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    return connection;
  } catch (err) {
    console.error("Error connecting to database: ", err);
    throw err;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X_Requested-With, Content-Type, Accept, Authorization,X-Api-Key"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");

  next();
});

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/auth", authRouter);

app.use(express.static(path.join(path.resolve(), "../dashboard/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "../dashboard/dist", "index.html"));
});
