const express = require("express");
const app = express();

const cors = require("cors")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const newsRouter = require("./routers/newsRouter")
app.use("/news", newsRouter)

app.listen(8000, (err) => {
    if (err) console.log("服务器启动错误", err)
    console.log("服务器启动成功");
});
