import "./import"

import Header from "../components/Header";
import Detail from "../components/Detail";

import { getUrlQueryValue } from "../utils/tools"

(function (doc) {

    let oApp = document.querySelector("#app")
    let currentNews = JSON.parse(localStorage.getItem("currentNews"))

    function init() {
        render()
    }

    function render() {
        let headerTpl = Header.tpl({
            url: getUrlQueryValue("path"),
            title: "新闻详情",
            showLeftIcon: true,
            showRightIcon: false
        })

        let detailTpl = Detail.tpl({
            title: currentNews.detail.title,
            author_name: currentNews.detail.author_name,
            date: currentNews.detail.date,
            content: currentNews.content
        })

        console.log(detailTpl);

        oApp.innerHTML += (headerTpl + detailTpl);
    }

    init()

})(document);