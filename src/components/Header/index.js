import "./index.less"
import tpl from "./index.tpl"

import { tplReplace } from "../../utils/tools"

export default {
    name: "Header",
    tpl(options) {
        let { url, showLeftIcon, showRightIcon, title } = options;
        return tplReplace(tpl, {
            url,
            title,
            showLeftIcon: showLeftIcon ? "block" : "none",
            showRightIcon: showRightIcon ? "block" : "none"
        })
    }
}