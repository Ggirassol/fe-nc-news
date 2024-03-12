import axios from "axios";

const ncNews = axios.create(
    { baseURL: "https://nc-news-8ork.onrender.com/api"}
)

export const getArticles = () => {
    return ncNews.get('/articles').then(({ data }) => {
        return data
    })
}

export const getSingleArticle = (article_id) => {
    return ncNews.get(`/articles/${article_id}`).then(({ data }) => {
        return data
    })
}

export const getArticleComments = (article_id) => {
    return ncNews.get(`/articles/${article_id}/comments`).then(({ data }) => {
        return data
    })
}