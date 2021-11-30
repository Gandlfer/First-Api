const express = require("express");
const dotenv = require("dotenv").config();
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello")
})

app.use("/copypasta", require("./copypastaController"))
app.use("/csgo", require("./skinsController"))

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Starting port " + process.env.PORT)
    }
})