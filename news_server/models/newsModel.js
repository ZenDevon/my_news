const db = require("../db")

class NewsModel {
    getNewsList(type) {
        let sql = `
            select * from news where news.category = '${type}' limit 0, 20
        `;
        return db.promise().query(sql)
    }
    // 获取新闻详情
    getNewDetail(id) {
        let sql = `
            select n.uniquekey as "uniquekey",
            JSON_OBJECT("title", n.title, "date", n.date, "category", n.category, "author_name",  n.author_name, "url", n.url,"thumbnail_pic_s", n.thumbnail_pic_s, "thumbnail_pic_s02", n.thumbnail_pic_s02, "thumbnail_pic_s03",n.thumbnail_pic_s03 ) as detail,
            d.content as "content"
            from detail d
            left join news n
            on d.uniquekey = n.uniquekey
            where n.uniquekey = '${id}'
        `
        return db.promise().query(sql)
    }
}

module.exports = new NewsModel()