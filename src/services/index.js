import { HTTP } from "../lib/http";

class Services extends HTTP {
    getNewsList(type, count) {
        return new Promise((resolve, reject) => {
            this.ajax({
                url: "/index",
                type: "POST",
                dataType: "JSON",
                data: {
                    field: type
                },
                success(data) {
                    console.log(data);
                },
                error(err) {
                    reject(err)
                }
            })
        })
    }
}

export default new Services();