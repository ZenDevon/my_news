function ajax({ url, method = "get", data = {}, timeout = 10000 } = {}) {
    let xhr = new XMLHttpRequest();
    let promise = new Promise((resolve, reject) => {
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status <= 300) {
                resolve(xhr.response);
            } else {
                reject({ code: xhr.status, message: xhr.statusText });
            }
        };

        xhr.onabort = function () {
            console.log("取消请求");
        };

        xhr.responseType = "json";

        xhr.timeout = timeout;
        let queryString = "";
        if (method.toUpperCase() == "GET") {
            if (data) {
                let queryArr = [];
                for (let key in data) {
                    queryArr.push(`${key}=${data[key]}`);
                }
                queryString = queryArr.join("&");
            }
            url = queryString ? `${url}?${queryString}` : url;
            xhr.open(method, url);

            xhr.send();
        } else {
            xhr.open(method, url);

            xhr.setRequestHeader("Content-type", "application/json");

            xhr.send(JSON.stringify(data));
        }
    });

    promise.cancel = function () {
        xhr.abort();
    };

    return promise;
}

export default ajax
