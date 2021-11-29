var express = require("express");
var router = express.Router();
var mongo = require("mongodb")
var MongoClient = mongo.MongoClient
const dbUrl = "mongodb://localhost:27017"
var db;

MongoClient.connect(dbUrl, (err, con) => {
    if (err) {
        console.log(err)
    }
    db = con.db("copypasta")
})

router.get("/", (req, res) => {
    res.send("copypasta")
})

module.exports = router