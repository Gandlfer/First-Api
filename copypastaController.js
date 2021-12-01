var express = require("express");
var router = express.Router();
var mongo = require("mongodb")
var MongoClient = mongo.MongoClient
const dbUrl = "mongodb://192.168.0.252:27017"
var db;

MongoClient.connect(dbUrl, (err, con) => {
    if (err) console.log(err)
    db = con.db("copypasta")
})

router.get("/", (req, res) => {
    db.collection("copypasta").find().toArray((err, products) => {
        res.send(products[1].name.replace("\n", "<br>").replace("\n", "<br>").replace("\n", "<br>").replace("\n", "<br>").replace("\n", "<br>"))
    })
})

module.exports = router