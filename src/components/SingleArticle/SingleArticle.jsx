import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleArticle, likeArticle } from "../../../api";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import "./SingleArticle.css"
import Comments from "../Comments/Comments";
import ErrorSnackBar from "../ErrorSnackBar/ErrorSnackBar";
import ErrorPage from "../ErrorPage/ErrorPage";

const SingleArticle = () => {

    const [currSingleArticle, setCurrSingleArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [hasUserLikedArticle, setHasUserLikedArticle] = useState(false)
    const [error, setError] = useState(false);
    const [beError, setBeError] = useState(null);

    const {article_id} = useParams();

    useEffect(() => {
        setIsLoading(true)
        getSingleArticle(article_id).then((data) => {
            setCurrSingleArticle(data.data.article)
            setIsLoading(false)
        }).catch((err) => {
          setBeError(err);
        });
    }, [])

    const handleArticleLikeBtn = () => {
      if (!hasUserLikedArticle) {
        setCurrSingleArticle((currSingleArticle) => {
          setHasUserLikedArticle(true);
          return { ...currSingleArticle, votes: currSingleArticle.votes + 1 };
        });
        likeArticle(article_id, 1).catch((err) => {
          console.log(err);
          setCurrSingleArticle((currSingleArticle) => {
            setHasUserLikedArticle(false);
            setError(true);
            setTimeout(() => {
              setError(false);
            }, "3000");
            return { ...currSingleArticle, votes: currSingleArticle.votes - 1 };
          });
        });
      } else {
        setCurrSingleArticle((currSingleArticle) => {
          setHasUserLikedArticle(false);
          return { ...currSingleArticle, votes: currSingleArticle.votes - 1 };
        });
        likeArticle(article_id, -1).catch((err) => {
          setCurrSingleArticle((currSingleArticle) => {
            setHasUserLikedArticle(true);
            setError(true);
            setTimeout(() => {
              setError(false);
            }, "3000");
            return { ...currSingleArticle, votes: currSingleArticle.votes + 1 };
          });
        });
      }
    };
    
    return beError ? 
    (<ErrorPage beError={beError} setBeError={setBeError}/>) :
    (isLoading ? (
      <h4 className="loading">Loading article...</h4>
    ) : (
        <div className="single-article">
        <h1>{currSingleArticle.title}</h1>
        <img src={currSingleArticle.article_img_url}/>
        <h2 className="author">
          <span>By </span>
          <Link to ={`/members/${currSingleArticle.author}`}>
            <span>{currSingleArticle.author}</span>
        </Link>
        </h2>
        <p>{currSingleArticle.body}</p>
        <h3>{currSingleArticle.created_at ? currSingleArticle.created_at.slice(0, 10) : ""}</h3>
        
          {hasUserLikedArticle ?
          (<div>
            <button className="liked-like-btn" aria-label="like" onClick={() => handleArticleLikeBtn()}><ThumbUpAltIcon/></button> {currSingleArticle.votes} {currSingleArticle.votes === 1 ? <span>Like</span> : <span>Likes</span>}
            <p className="you-liked">You liked this article!</p>
          </div>
          ) :
          (<p>
            <button aria-label="like" onClick={() => handleArticleLikeBtn(article_id)}><ThumbUpAltIcon /></button> {currSingleArticle.votes} {currSingleArticle.votes === 1 ? <span>Like</span> : <span>Likes</span>}
          </p>)}
          {error && (<ErrorSnackBar/>)}
          <Comments article_id={article_id}/>
        </div>
      )
    );
}

export default SingleArticle;