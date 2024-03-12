import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, getArticleComments } from "../../../api";
import "./SingleArticle.css"

const SingleArticle = () => {

    const [currSingleArticle, setCurrSingleArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [currComments, setCurrComents] = useState([])

    const {article_id} = useParams();
    useEffect(() => {
        setIsLoading(true)
        getSingleArticle(article_id).then(({article}) => {
            setCurrSingleArticle(article)
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        getArticleComments(article_id).then(({comments}) => {
            setCurrComents(comments)
        })
    }, [])
    
    return isLoading ? (
      <p className="loading">Loading article...</p>
    ) : (
      <>
        <div className="single-article">
        <h1>{currSingleArticle.title}</h1>
        <img src={currSingleArticle.article_img_url}/>
        <h2 className="author">By {currSingleArticle.author}</h2>
        <p>{currSingleArticle.body}</p>
        <h3>{currSingleArticle.created_at ? currSingleArticle.created_at.slice(0, 10) : ""}</h3>
        <p>{currSingleArticle.votes} Likes</p>
        </div>
        <div className="comments">
          <h2>Comments</h2>
          <ul>
            {currComments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <p>{comment.body}</p>
                  <div className="space-between">
                    <span className="likes">{comment.votes} Likes</span>
                    <div className="author-date">
                      <span className="author">{comment.author} </span>
                      <span className="date">
                        {comment.created_at.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );

}

export default SingleArticle;