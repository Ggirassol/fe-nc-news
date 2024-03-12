import axios from "axios";

const ncNews = axios.create(
    { baseURL: "https://nc-news-8ork.onrender.com/api"}
)

export const getArticles = () => {
    return ncNews.get('/articles').then(({ data }) => {
        return data
    })
}
