function tplReplace(template, templateObj) {
    return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
        return templateObj[key.trim()];
    });
}

function setPageData(data, count) {
    const len = data.length,
        pageData = [];

    let index = 0;
    while (index < len) {
        pageData.push(data.slice(index, index += count))
    }
    return pageData
}

function scrollToTop() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
}

// 判断滚动到底部
function scrollToBottom(callback) {
    if (_getScrollTop() + _getWindowHeight() == _getScrollHeight()) {
        callback()
    }
}

// 获取父节点
function getItemNode(target) {
    while (target = target.parentNode) {
        if (target.className.split(" ")[0] == "news-item") {
            return target
        }
    }
}

// 获取urlquerystring
function getUrlQueryValue(key) {
    const reg = new RegExp(`(^|&)${encodeURIComponent(key)}=([^&]*)(&|$)`, 'i');
    // 从 window.location.search 中提取查询字符串，并去掉开头的 '?'  
    const searchParams = window.location.search.substring(1);
    // 执行匹配操作  
    const res = searchParams.match(reg);
    // 如果找到匹配项，则返回解码后的值；否则返回 null  
    return res !== null ? decodeURIComponent(res[2]) : null;
}

export {
    tplReplace,
    setPageData,
    scrollToTop,
    scrollToBottom,
    getItemNode,
    getUrlQueryValue
}

/* --------------------------------- 内部方法 ---------------------------------*/
// 获取滚动条的距离
function _getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;

    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }

    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
        // console.log(documentScrollTop);
    }

    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return Math.ceil(scrollTop);
}

// 获取整个文档的高度（包括滚动条的距离）
function _getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;

    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }

    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }

    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;

    return scrollHeight;
}

// 获取窗口的高度，不包含border 和 margin
function _getWindowHeight() {
    var windowHeight = 0;

    if (document.compatMode == 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }

    return windowHeight;
}