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

export const likeArticle = (article_id, vote) => {
    return ncNews.patch(`/articles/${article_id}`, {inc_votes: vote}).then(({ data })=> {
        return data 
    })
}

export const addComment = (article_id, username, body) => {
    return ncNews.post(`/articles/${article_id}/comments`, {username: username, body: body}).then(({ data }) => {
        return data
    })
}

export const deleteComment = (comment_id) => {
    return ncNews.delete(`/comments/${comment_id}`).then(( {data} ) => {
        return data
    })
}

export const getTopics = () => {
    return ncNews.get('/topics').then(( {data }) => {
        return data
    })
}

export const getArticlesByTopic = (topic) => {
    return ncNews.get(`/articles?topic=${topic}`).then(( {data }) => {
        return data
    })
}