import axios from "axios";

const ncNews = axios.create(
    { baseURL: "https://nc-news-8ork.onrender.com/api"}
)

export const getArticles = (sort_by, order_by) => {
    let url = '/articles'
    if (sort_by) {
      url += `?sort_by=${sort_by}`
      if (order_by) {
        url += `&order_by=${order_by}`
      }
    } else if (order_by) {
      url += `?order_by=${order_by}`
    }
    return ncNews.get(url)
  }

export const getSingleArticle = (article_id) => {
    return ncNews.get(`/articles/${article_id}`)
}

export const getArticleComments = (article_id) => {
    return ncNews.get(`/articles/${article_id}/comments`)
}

export const likeArticle = (article_id, vote) => {
    return ncNews.patch(`/articles/${article_id}`, {inc_votes: vote})
}

export const addComment = (article_id, username, body) => {
    return ncNews.post(`/articles/${article_id}/comments`, {username: username, body: body})
}

export const deleteComment = (comment_id) => {
    return ncNews.delete(`/comments/${comment_id}`)
}

export const getTopics = () => {
    return ncNews.get('/topics')
}

export const getArticlesByTopic = (topic, sort_by, order_by) => {
    let url = `/articles?topic=${topic}`
    if (sort_by) {
        url += `&sort_by=${sort_by}`
        if (order_by) {
          url += `&order_by=${order_by}`
        }
      } else if (order_by) {
        url += `&order_by=${order_by}`
      }
    return ncNews.get(url)
}

export const likeComment = (comment_id, vote) => {
  return ncNews.patch(`/comments/${comment_id}`, {inc_votes: vote})
}