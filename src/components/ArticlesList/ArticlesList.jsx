import { useEffect, useState } from "react";
import { getArticles } from "../../../api";
import ArticleCard from "../ArticleCard.jsx/ArticleCard";
import "./ArticlesList.css"

const ArticlesList = () => {

    const [articlesList, setArticlesList] = useState([])

    useEffect(() => {
        getArticles().then(({ articles }) => {
            setArticlesList(articles)
        })
    }, [])

    return (
    <ul className="articles-list">
        {articlesList.map(article => {
            return <ArticleCard key={article.article_id} article={article}/>
        })}
    </ul>
    )
}

export default ArticlesList;