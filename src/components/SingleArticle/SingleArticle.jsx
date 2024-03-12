import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../../../api";
import "./SingleArticle.css"

const SingleArticle = () => {

    const [currSingleArticle, setCurrSingleArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const {article_id} = useParams();
    useEffect(() => {
        setIsLoading(true)
        getSingleArticle(article_id).then(({article}) => {
            setCurrSingleArticle(article)
            setIsLoading(false)
        })
    }, [])
    
    return isLoading ?
        (<p className="loading">Loading article...</p>) : (
        <div className="single-article">
        <h1>{currSingleArticle.title}</h1>
        <img src={currSingleArticle.article_img_url}/>
        <h2 className="author">By {currSingleArticle.author}</h2>
        <p>{currSingleArticle.body}</p>
        <h3>{currSingleArticle.created_at ? currSingleArticle.created_at.slice(0, 10) : ""}</h3>
        <p>{currSingleArticle.votes} Likes</p>
        </div>
    )

}

export default SingleArticle;