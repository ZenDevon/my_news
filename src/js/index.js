import "./import"

import services from "../services"

// 引入组件
import Header from "../components/Header";
import NavBar from "../components/NavBar"
import NewsList from "../components/NewsList"
import PageLoading from "../components/PageLoading";
import MoreLoading from "../components/MoreLoading";

// 引入数据
import { NEWS_TYPE } from "../data"

import { setPageData, scrollToBottom } from "../utils/tools"

(function (doc) {

    let oApp = doc.querySelector("#app")

    let listWrapper = "";
    let t = null;

    const config = {
        type: "头条",
        count: 6,
        pageNum: 0,
        isLoading: false
    }

    let newsData = {}

    async function init() {
        render();
        await getNewsList()
        bindEvent()
    }

    function bindEvent() {
        NavBar.bindEvent(setType);
        NewsList.bindEvent(listWrapper, setCurrentNews);
        window.addEventListener("scroll", scrollToBottom.bind(null, getMoreList), false)
    }

    // 顶部导航渲染
    function render() {
        let headerTpl = Header.tpl({
            url: "/",
            title: "新闻头条",
            showLeftIcon: false,
            showRightIcon: true
        })

        let navBarTpl = NavBar.tpl(NEWS_TYPE);
        const listWrapperTpl = NewsList.wrapTpl(82);
        oApp.innerHTML += (headerTpl + navBarTpl + listWrapperTpl);
        listWrapper = document.querySelector(".news-list");
    }

    // 渲染新闻列表
    function renderList(data) {
        const { pageNum } = config;
        const newsItemTpl = NewsList.tpl({
            data,
            pageNum
        });

        MoreLoading.remove(listWrapper);
        listWrapper.innerHTML += newsItemTpl;
        config.isLoading = false;
        NewsList.imgShow();
    }

    // 导航标签切换
    function setType(type) {
        config.type = type
        config.pageNum = 0;
        config.isLoading = false;
        listWrapper.innerHTML = "";
        getNewsList();
    }

    // 获取数据
    async function getNewsList() {
        const { type, count, pageNum } = config;
        if (newsData[type]) {
            // console.log("default");
            renderList(newsData[type][pageNum]);
            return;
        }
        // console.log("poll");
        listWrapper.innerHTML = PageLoading.tpl();
        let res = await services.getNewsList(type);
        newsData[type] = setPageData(res.result, count);
        setTimeout(() => {
            listWrapper.innerHTML = "";
            renderList(newsData[type][pageNum]);
        }, 1500);

    }

    // 获取更多数据
    function getMoreList() {
        console.log(config.isLoading);
        if (!config.isLoading) {
            config.pageNum++;
            clearTimeout(t);
            const { pageNum, type } = config;
            if (pageNum >= newsData[type].length) {
                MoreLoading.add(listWrapper, false)
            } else {
                config.isLoading = true
                MoreLoading.add(listWrapper, true)
                t = setTimeout(() => {
                    getNewsList();
                }, 1000);
            }
        }
    }

    // 获取新闻详情
    async function getNewDetail(id) {
        let data = await services.getNewDetail(id);

        localStorage.setItem("currentNews", JSON.stringify(data.result))
    }

    function setCurrentNews(options) {
        let { pageNum, index } = options;
        let currentNews = newsData[config.type][pageNum][index]
        getNewDetail(currentNews.uniquekey);
    }



    init();

})(document)




