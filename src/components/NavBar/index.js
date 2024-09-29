import "./index.less"

import itemTpl from "./tpl/item.tpl"
import navTpl from './tpl/index.tpl'

import { tplReplace, scrollToTop } from "../../utils/tools"

export default {
    name: "NavBar",
    _curIdx: 0,
    tpl(data) {
        let itemList = "";

        data.map(({ title, type }, index) => {
            itemList += tplReplace(itemTpl, {
                isCurrent: !index ? "current" : "",
                title,
                type
            })
        })
        return tplReplace(navTpl, {
            wrapperWidth: .6 * data.length,
            itemList
        })
    },
    bindEvent(setType) {
        let oNav = document.querySelector(".nav"),
            oItems = document.querySelectorAll(".item");

        oNav.addEventListener("click", this._setNav.bind(this, oItems, setType), false)
    },
    _setNav(items, setType) {
        const tar = arguments[2].target,
            className = tar.className.trim();
        if (className == "item") {
            const type = tar.dataset.type;
            setType(type)
            scrollToTop()
            items[this._curIdx].className = "item",
                this._curIdx = [].indexOf.call(items, tar);
            items[this._curIdx].className += " current"
        }
    }
}