import "./import"

import services from "../services"

async function getNewsList() {
    let data = await services.getNewsList("top", 10)
    console.log(data);
}
getNewsList()