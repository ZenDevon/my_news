import "./import"

import Header from "../components/Header";
import NewsList from "../components/NewsList";
import NoDataTip from "../components/NoDataTip"

import services from "../services"

(function (doc) {

    let oApp = doc.querySelector("#app");
    let followList = JSON.parse(localStorage.getItem("followList") || "[]");
    let oListWrapper = null;

    function init() {
        console.log("collevtion init");
        render();
        bindEvent();
    }

    function bindEvent() {
        followList.legnth && NewsList.bindEvent(oListWrapper, setCurrentNews);
    }

    function render() {
        let headerTpl = Header.tpl({
            url: "/",
            title: "我的收藏",
            showLeftIcon: true,
            showRightIcon: false
        })

        if (followList.length > 0) {
            let listWrapperTpl = NewsList.wrapTpl(44);
            oApp.innerHTML += (headerTpl + listWrapperTpl);
            oListWrapper = doc.querySelector(".news-list");
            renderList(followList)
        } else {
            let noDataTpl = NoDataTip.tpl();
            oApp.innerHTML += (headerTpl + noDataTpl);
        }

    }

    function renderList(data) {
        let newData = [];
        data.forEach(item => {
            newData.push({
                uniquekey: item.uniquekey,
                title: item.detail.title,
                url: item.detail.url,
                author_name: item.detail.author_name,
                date: item.detail.date,
                thumbnail_pic_s: item.detail.thumbnail_pic_s,
                thumbnail_pic_s02: item.detail.thumbnail_pic_s02,
                thumbnail_pic_s03: item.detail.thumbnail_pic_s03,
                category: item.detail.category
            })
        });
        let newsListTpl = NewsList.tpl({
            data: newData,
            pageNum: -1
        })
        oListWrapper.innerHTML += newsListTpl;
        NewsList.imgShow();
    }

    function setCurrentNews(options) {
        const { index } = options;
        let currentNews = followList[index];
        getNewDetail(currentNews.uniquekey);
    }

    // 获取新闻详情
    async function getNewDetail(id) {
        let data = await services.getNewDetail(id);

        localStorage.setItem("currentNews", JSON.stringify(data.result));
    }

    init()

})(document);