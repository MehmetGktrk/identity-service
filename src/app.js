const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorMiddleware = require("./middlewares/error.middleware");

const authRoutes = require("./api/v1/auth/auth.routes");
const userRoutes = require("./api/v1/user/user.routes");


const app = express();


app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);



app.use(errorMiddleware);

module.exports = app;   