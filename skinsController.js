var express = require("express");
var router = express.Router();
var mongo = require("mongodb")
var MongoClient = mongo.MongoClient
const dbUrl = "mongodb://" + process.env.MONGODBIP + ":" + process.env.MONGODBPORT
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