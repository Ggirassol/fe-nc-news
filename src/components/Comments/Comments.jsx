import { useEffect, useState, useContext } from "react";
import { getArticleComments, likeComment } from "../../../api";
import AddComment from "../AddComment/AddComment";
import UserContext from "../../contexts/User";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../../../api";
import ErrorSnackBar from "../ErrorSnackBar/ErrorSnackBar";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import "./Comments.css";

const Comments = ({ article_id }) => {
  const [currComments, setCurrComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currUser } = useContext(UserContext);
  const [likedComments, setLikedComments] = useState([]);
  const [dislikedComments, setDislikedComments] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getArticleComments(article_id).then(({ data }) => {
      setIsLoading(false);
      setCurrComments(data.comments);
    });
  }, []);

  const handleDeleteComment = (comment_id) => {
    const commentsBeforeDelete = [...currComments];
    setCurrComments(currComments.filter(comment => 
      comment.comment_id !== comment_id));
    deleteComment(comment_id).catch((err) => {
      setCurrComments(commentsBeforeDelete);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, "3000");
    });
  };

  const handleLikeComment = (comment_id) => {
    if (!likedComments.includes(comment_id)) {
      if (dislikedComments.includes(comment_id)) {
        handleDislikeComment(comment_id)
      }
      setCurrComments((prevComments) => {
        setLikedComments([...likedComments, comment_id]);
        return prevComments.map(comment => {
          return comment.comment_id === comment_id ? { ...comment, votes: comment.votes + 1 } : comment;
        });
      });
      likeComment(comment_id, 1).catch((err) => {
        setCurrComments((prevComments) => {
          setLikedComments(likedComments.map(likedComment => {
            return likedComment !== comment_id
          }))
          setError(true);
          setTimeout(() => {
            setError(false);
          }, "3000");
          return prevComments.map((comment) => {
            return comment.comment_id === comment_id ? { ...comment, votes: comment.votes - 1 } : comment;
          });
        });
      });
    } else {
      setCurrComments((prevComments) => {
        setLikedComments(likedComments.filter(likedComment => {
          likedComment !== comment_id
        }))
        return prevComments.map((comment) => {
          return comment.comment_id === comment_id ? { ...comment, votes: comment.votes - 1 } : comment;
        });
      });
      likeComment(comment_id, -1).catch((err) => {
        setCurrComments((prevComments) => {
          setLikedComments([...likedComments, comment_id]);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, "3000");
          return prevComments.map((comment) => {
            return comment.comment_id === comment_id ? { ...comment, votes: comment.votes + 1 } : comment;
          });
        });
      });
    }
  };

  const handleDislikeComment = (comment_id) => {
    if (!dislikedComments.includes(comment_id)) {
      if (likedComments.includes(comment_id)) {
        handleLikeComment(comment_id)
      }
      setCurrComments((prevComments) => {
        setDislikedComments([...dislikedComments, comment_id])
        return prevComments.map((comment) => {
          return comment.comment_id === comment_id ? { ...comment, votes: comment.votes - 1 } : comment;
        });
      });
      likeComment(comment_id, -1).catch((err) => {
        setCurrComments((prevComments) => {
          setDislikedComments(dislikedComments.filter(dislikedComment =>
            dislikedComment !== comment_id
          ))
          setError(true);
          setTimeout(() => {
            setError(false);
          }, "3000");
          return prevComments.map((comment) => {
            return comment.comment_id === comment_id ? { ...comment, votes: comment.votes + 1 } : comment;
          });
        });
      });
    } else {
      setCurrComments((prevComments) => {
        setDislikedComments(dislikedComments.filter(dislikedComment =>
          dislikedComment !== comment_id))
        return prevComments.map((comment) => {
          return comment.comment_id === comment_id ? { ...comment, votes: comment.votes + 1 } : comment;
        });
      });
      likeComment(comment_id, 1).catch((err) => {
        setCurrComments((prevComments) => {
          setDislikedComments([...dislikedComments, comment_id])
          setError(true);
          setTimeout(() => {
            setError(false);
          }, "3000");
          return prevComments.map((comment) => {
            return comment.comment_id === comment_id ? { ...comment, votes: comment.votes - 1 } : comment;
          });
        });
      });
    }
  };

  return (
    <>
    {isLoading ? (<h3 className="loading">Loading comments...</h3>) : 
    (<>
      <AddComment article_id={article_id} currComments={currComments} setCurrComments={setCurrComments}/> 
    <div className="comments">
      <h2>Comments</h2>
      <ul>
        {currComments.map((comment, i) => {
          return (
            <li key={i}>
              <p>{comment.body}</p>
              <div className="space-between">
                <span className="likes">{comment.votes} {comment.votes === 1 || comment.votes === 1 ? <span>Like</span> : <span>Likes</span>}</span>
                <div className="author-date">
                  <span className="author">{comment.author} </span>
                  <span className="date">
                    {comment.created_at.slice(0, 10)}
                  </span>
                </div>
              </div>
              <div className="space-between">
                <div>
                {likedComments.includes(comment.comment_id) ? (
                <button className="liked-like-btn" aria-label="like comment" onClick={() => handleLikeComment(comment.comment_id)}><ThumbUpAltIcon/></button>) :
                (<button aria-label="like comment" onClick={() => handleLikeComment(comment.comment_id)}><ThumbUpAltIcon/></button>)
                }
                {dislikedComments.includes(comment.comment_id) ? (
                <button className="liked-like-btn" aria-label="dislike comment" onClick={() => handleDislikeComment(comment.comment_id)} ><ThumbDownAltIcon/></button>) :
                (<button aria-label="dislike comment" onClick={() => handleDislikeComment(comment.comment_id)} ><ThumbDownAltIcon/></button>)}
                </div>
                {currUser.username === comment.author && (
                <button aria-label="delete comment" onClick={() => handleDeleteComment(comment.comment_id)}><DeleteIcon/></button>
                )}
                </div>
            </li>
          );
        })}
      </ul>
    </div>
    {error && (<ErrorSnackBar/>) }
    </>)}
    </>
  )
};

export default Comments;
