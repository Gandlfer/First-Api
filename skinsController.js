var express = require("express");
var router = express.Router();
var mongo = require("mongodb")
var MongoClient = mongo.MongoClient
const dbUrl = "mongodb://192.168.0.252:27017"
var db;

MongoClient.connect(dbUrl, (err, con) => {
    if (err) console.log(err)
    db = con.db("csgo")
})

router.get("/", (req, res) => {
    db.collection("csgo-skins-collection").find().toArray((err, col) => {
        res.send(col)
    })
})

router.get("/:collection", (req, res) => {
    db.collection("csgo-skins-collection").findOne({ name: req.params.collection }, (err, col) => {
        if (err) console.log(err)
        res.send(col.skins)
    })
})

module.exports = router