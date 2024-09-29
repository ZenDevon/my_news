import "./import"

import Header from "../components/Header";
import Detail from "../components/Detail";
import Follow from "../components/Follow";

import { getUrlQueryValue } from "../utils/tools"

(function (doc) {

    let oApp = document.querySelector("#app")
    let currentNews = JSON.parse(localStorage.getItem("currentNews"));
    let followList = JSON.parse(localStorage.getItem("followList") || "[]");

    function init() {
        render();
        bindEvent();
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

        const followTpl = createFolllowTpl();
        oApp.innerHTML += (headerTpl + detailTpl + followTpl);
    }

    function bindEvent() {
        Follow.bindEvent(doFollow);
    }

    function createFolllowTpl() {
        const isExit = followList.find((item) => item.uniquekey === currentNews.uniquekey);
        return isExit ? Follow.follow() : Follow.unfollow();
    }

    function doFollow(status) {
        console.log(status);
        let followList = JSON.parse(localStorage.getItem("followList") || "[]");
        if (status) {
            followList.push(currentNews)
        } else {
            followList = followList.filter(item => item.uniquekey !== currentNews.uniquekey)
        }
        localStorage.setItem("followList", JSON.stringify(followList))
    }

    init()

})(document);