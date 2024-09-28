import FastClick from "./fastclick";

window.addEventListener("load", function () {
    FastClick.attach(document.body);
}, false)

document.documentElement.addEventListener("touchmove", function (e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, false)

// 移动端适配
function adapter() {
    let deviceWidth = document.documentElement.clientWidth;
    let font = (deviceWidth * 100) / 375;
    document.documentElement.style.fontSize = font + "px";
}
adapter();
window.onresize = adapter;