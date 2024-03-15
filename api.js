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
    return ncNews.get(url).then(({ data }) => {
      return data;
    })
  }

export const getSingleArticle = (article_id) => {
    return ncNews.get(`/articles/${article_id}`)
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
    return ncNews.get(url).then(( {data }) => {
        return data
    })
}