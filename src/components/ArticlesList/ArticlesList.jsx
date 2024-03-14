import { useEffect, useState } from "react";
import { getArticles } from "../../../api";
import ArticleCard from "../ArticleCard.jsx/ArticleCard";
import "./ArticlesList.css"

const ArticlesList = ({order_by, sort_by}) => {

    const [articlesList, setArticlesList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getArticles(sort_by, order_by).then(({ articles }) => {
            setArticlesList(articles)
            setIsLoading(false)
        })
    }, [sort_by, order_by])



    return isLoading ?
    (<h4 className="loading">Loading articles...</h4>) :
    (<ul className="articles-list">
        {articlesList.map(article => {
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </ul>)
}

export default ArticlesList;