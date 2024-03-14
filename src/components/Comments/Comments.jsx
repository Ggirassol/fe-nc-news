import { useEffect, useState, useContext } from "react";
import { getArticleComments } from "../../../api";
import AddComment from "../AddComment/AddComment";
import UserContext from "../../contexts/User";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteComment } from "../../../api";
import ErrorSnackBar from "../ErrorSnackBar/ErrorSnackBar";
import "./Comments.css"


const Comments = ({ article_id }) => {
  const [currComments, setCurrComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currUser } = useContext(UserContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    getArticleComments(article_id).then(({ comments }) => {
      setIsLoading(false);
      setCurrComments(comments);
    });
  }, []);

  const handleDeleteComment = (comment_id) => {
    const commentsBeforeDelete = [...currComments]
    setCurrComments((prevComments) => {
      return prevComments.filter(comment => {
        return comment.comment_id !== comment_id     
      })
    })
    deleteComment(comment_id)
    .catch((err) => {
      setCurrComments(commentsBeforeDelete)
      setError(true)
      setTimeout(() => {
        setError(false);
      }, "3000");
    })
  }

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
                <span className="likes">{comment.votes} Likes</span>
                <div className="author-date">
                  <span className="author">{comment.author} </span>
                  <span className="date">
                    {comment.created_at.slice(0, 10)}
                  </span>
                  {currUser.username === comment.author && (
                    <p><button onClick={() => handleDeleteComment(comment.comment_id)}><DeleteIcon/></button></p>
                  )}
                </div>
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
