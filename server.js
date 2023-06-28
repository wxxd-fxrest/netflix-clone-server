require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const {MONGO_URI, PORT} = process.env;

const useRoutes = require("./routes/UserRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connect")
}); 

app.use("/api/user", useRoutes);

app.listen(PORT, console.log("server started"));