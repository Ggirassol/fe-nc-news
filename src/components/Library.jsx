import { useEffect, useState, useContext } from "react";
import { getArticles } from "../../api";
import ArticleCard from "./ArticleCard.jsx/ArticleCard";
import UserContext from "../contexts/User"
import "./ArticlesList/ArticlesList.css"

const Library = ({order_by, sort_by}) => {

    const { currUser } = useContext(UserContext);

    const [myArticlesList, setMyArticlesList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [beError, setBeError] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        getArticles(sort_by, order_by).then(({ data }) => {
            const myArticles = data.articles.filter(article => {
                return article.author === currUser.username
            })
            setMyArticlesList(myArticles)
            setIsLoading(false)
        }).catch((err) => {
            setBeError(err);
          });
    }, [sort_by, order_by])


    return beError ? 
    (<ErrorPage beError={beError} setBeError={setBeError}/>) :
    (isLoading ?
    (<h4 className="loading">Loading articles...</h4>) :
    (myArticlesList.length === 0 ? (<h4 className="loading">Your library is empty</h4>) :
    (<ul className="articles-list">
    {myArticlesList.map(article => {
        return <ArticleCard key={article.article_id} article={article}/>
    })}
    </ul>))
    )
}

export default Library;