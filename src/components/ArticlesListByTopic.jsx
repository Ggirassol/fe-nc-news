import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "../../api";
import ArticleCard from "./ArticleCard.jsx/ArticleCard";

const ArticlesListByTopic = ({order_by, sort_by}) => {
    const { topic } = useParams();
    const [articlesList, setArticlesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticlesByTopic(topic, sort_by, order_by).then(({ articles }) => {
            setArticlesList(articles)
            setIsLoading(false)
        })
    }, [topic, sort_by, order_by])


    return isLoading? (
          <h4 className="loading">Loading articles...</h4>
        ) : (
          <>
            <ul className="articles-list">
              {articlesList.map((article) => {
                return (
                  <ArticleCard key={article.article_id} article={article} />
                );
              })}
            </ul>
          </>
        )
}

export default ArticlesListByTopic;