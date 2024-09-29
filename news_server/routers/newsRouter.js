const express = require("express")
const router = express.Router()

const newsControll = require("../controllers/newControll")
const newControll = require("../controllers/newControll")

router.get("/getNewsList", newControll.getNewsList)
router.get("/getNewDetail/:id", newsControll.getNewDetail)

module.exports = router