import "./import"

import Header from "../components/Header";

(function (doc) {

    let oApp = document.querySelector("#app")

    function init() {
        render()
    }

    function render() {
        let headerTpl = Header.tpl({
            url: "/",
            title: "我的收藏",
            showLeftIcon: true,
            showRightIcon: false
        })

        oApp.innerHTML += headerTpl
    }

    init()

})(document);