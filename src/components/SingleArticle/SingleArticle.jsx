import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, likeArticle, dislikeArticle } from "../../../api";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import "./SingleArticle.css"
import Comments from "../Comments/Comments";

const SingleArticle = () => {

    const [currSingleArticle, setCurrSingleArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [hasUserLikedArticle, setHasUserLikedArticle] = useState(false)

    const {article_id} = useParams();

    useEffect(() => {
        setIsLoading(true)
        getSingleArticle(article_id).then(({article}) => {
            setCurrSingleArticle(article)
            setIsLoading(false)
        })
    }, [])

    const handleArticleLikeBtn = () => {
      if (!hasUserLikedArticle) {
        setCurrSingleArticle((currSingleArticle) => {
          setHasUserLikedArticle(true);
          return { ...currSingleArticle, votes: currSingleArticle.votes + 1 };
        });
        likeArticle(article_id).catch((err) => {
          console.log(err);
          setCurrSingleArticle((currSingleArticle) => {
            setHasUserLikedArticle(false);
            return { ...currSingleArticle, votes: currSingleArticle.votes - 1 };
          });
        });
      } else {
        setCurrSingleArticle((currSingleArticle) => {
          setHasUserLikedArticle(false);
          return { ...currSingleArticle, votes: currSingleArticle.votes - 1 };
        });
        dislikeArticle(article_id).catch((err) => {
          console.log(err);
          setCurrSingleArticle((currSingleArticle) => {
            setHasUserLikedArticle(true);
            return { ...currSingleArticle, votes: currSingleArticle.votes + 1 };
          });
        });
      }
    };
    
    return isLoading ? (
      <h4 className="loading">Loading article...</h4>
    ) : (
        <div className="single-article">
        <h1>{currSingleArticle.title}</h1>
        <img src={currSingleArticle.article_img_url}/>
        <h2 className="author">By {currSingleArticle.author}</h2>
        <p>{currSingleArticle.body}</p>
        <h3>{currSingleArticle.created_at ? currSingleArticle.created_at.slice(0, 10) : ""}</h3>
        
          {hasUserLikedArticle ?
          (<div>
            <button className="liked-like-btn" onClick={() => handleArticleLikeBtn()}><ThumbUpAltIcon /></button> {currSingleArticle.votes} {currSingleArticle.votes === 1 ? <span>Like</span> : <span>Likes</span>}
            <p className="you-liked">You liked this article!</p>
          </div>
          ) :
          (<p>
            <button onClick={() => handleArticleLikeBtn(article_id)}><ThumbUpAltIcon /></button> {currSingleArticle.votes} {currSingleArticle.votes === 1 ? <span>Like</span> : <span>Likes</span>}
          </p>)}
          <Comments article_id={article_id}/>

        </div>
    );
}

export default SingleArticle;