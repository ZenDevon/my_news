const newsModel = require("../models/newsModel")

class NewControll {
    // 获取新闻列表
    async getNewsList(req, res) {
        try {
            let field = req.query.field;
            let data = await newsModel.getNewsList(field);
            res.json({
                code: 0,
                result: data[0],
                msg: "获取成功"
            })

        } catch (error) {
            res.sendStatus(500)
        }
    }
    async getNewDetail(req, res) {
        try {
            let data = await newsModel.getNewDetail(req.params.id);
            res.json({
                code: 0,
                result: data[0][0],
                msg: "获取成功"
            })
        } catch (error) {
            res.sendStatus(500)
            res.json({
                code: -1001,
                msg: "获取失败"
            })
        }
    }
}

module.exports = new NewControll()