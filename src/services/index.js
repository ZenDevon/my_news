import ajax from "../lib/http";

const BASE_URL = "http://127.0.0.1:8000/news"

class Services {
    getNewsList(type) {
        return ajax({
            url: `${BASE_URL}/getNewsList`,
            data: {
                field: type
            }
        })
    }
    getNewDetail(id) {
        return ajax({
            url: `${BASE_URL}/getNewDetail/${id}`
        })
    }
}

export default new Services();