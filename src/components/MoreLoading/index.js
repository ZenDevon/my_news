import "./index.less";
import tpl from "./index.tpl"

import { tplReplace } from "../../utils/tools"

export default {
    name: "MoreLoading",
    _tpl(isLoading) {
        return tplReplace(tpl, {
            isLoading: isLoading ? "loading" : "",
            text: isLoading ? "正在加载中..." : "没有更多数据"
        })
    },
    remove(oList) {
        let oMoreLoading = oList.querySelector(".more-loading");
        oMoreLoading && oMoreLoading.remove()
    },
    add(oList, isLoading) {
        let oMoreLoading = oList.querySelector(".more-loading");
        if (!oMoreLoading) {
            oList.innerHTML += this._tpl(isLoading)
        }
    }
}