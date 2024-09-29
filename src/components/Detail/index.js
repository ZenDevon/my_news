import "./index.less";
import tpl from "./index.tpl"

import { tplReplace } from "../../utils/tools"

export default {
    name: "Detail",
    tpl(options) {
        const {
            title,
            author_name,
            date,
            content
        } = options;
        return tplReplace(tpl, {
            title,
            author_name,
            date,
            content: content ? content : ""
        })
    }
}