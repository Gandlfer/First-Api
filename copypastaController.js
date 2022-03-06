var express = require("express");
var router = express.Router();
var mongo = require("mongodb")
var MongoClient = mongo.MongoClient
const dbUrl = "mongodb://" + process.env.MONGODBIP + ":" + process.env.MONGODBPORT
var db;

function toString(arr) {
    var s = ""
    for (x in arr) {
        s = s + arr[x].copypasta.replaceAll("\n", "<br>") + "<br>"
    }
    return s
}
MongoClient.connect(dbUrl, (err, con) => {
    if (err) console.log(err)
    db = con.db("discordPyUtil")
})

router.get("/", (req, res) => {
    db.collection("copypasta").find({}, { projection: { _id: 0 } }).toArray((err, products) => {
        res.send(toString(products))
    })
})

router.get("/getraw/:index", (req, res) => {
    db.collection("copypasta").findOne({ "index": parseInt(req.params.index) })
        .then(
            (result) => {
                try {
                    res.json({
                        status: "Success",
                        data: {
                            index: result.index,
                            copypasta: result.copypasta
                        }
                    })
                } catch (Exception) {
                    res.json({
                        status: "Error",
                        data: "Fail to get data for " + req.params.index
                    })
                }
            }
        )
})
router.get("/count", (req, res) => {
    db.collection("copypasta").count().then((result) => {
        try {
            res.json({
                status: "Success",
                data: {
                    count: result
                }
            })
        } catch (Exception) {
            res.json({
                status: "Error",
                data: "Fail to get data"
            })
        }
    })
})
router.get("/get/:index", (req, res) => {
    db.collection("copypasta").findOne({ "index": parseInt(req.params.index) })
        .then(
            (result) => {
                try {
                    res.send(result.copypasta.replaceAll("\n", "<br>"))
                } catch (Exception) {
                    res.json({
                        status: "Error",
                        data: "Fail to get data for " + req.params.index
                    })
                }
            }
        )
})


module.exports = router