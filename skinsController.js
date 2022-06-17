var express = require("express");
var router = express.Router();
var mongo = require("mongodb")
var MongoClient = mongo.MongoClient
const dbUrl = "mongodb://" + process.env.USERID + ":" + process.env.PASSWORD + "@" + process.env.MONGODBIP + ":" + process.env.MONGODBPORT
var db;

MongoClient.connect(dbUrl, (err, con) => {
    if (err) console.log(err)
    db = con.db("csgo")
})

router.get("/", (req, res) => {
    db.collection("csgo-skins-collection").find({}, { projection: { _id: 0 } }).toArray((err, col) => {
        res.send(col)
    })
})

router.get("/:collection", (req, res) => {

    db.collection("csgo-skins-collection").findOne({ name: req.params.collection })
        .then((result) => {
            try {
                res.json({
                    status: "Success",
                    data: result.skins
                })
            } catch (Exception) {
                res.json({
                    status: "Error",
                    data: "Fail to get data for " + req.params.collection
                })
            }
        })
})

module.exports = router