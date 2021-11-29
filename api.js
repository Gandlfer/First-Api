var express = require("express");

var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Hello")
})
app.use("/copypasta", require("./copypastaController"))
app.listen(8800, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Starting port 8800")
    }
})