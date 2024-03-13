import { useEffect, useState } from "react";
import { getArticleComments } from "../../../api";
import AddComment from "../AddComment/AddComment";
import "./Comments.css"

const Comments = ({ article_id }) => {
  const [currComments, setCurrComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleComments(article_id).then(({ comments }) => {
      setIsLoading(false);
      setCurrComments(comments);
    });
  }, []);

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
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
    </>)}
    </>
  )
};

export default Comments;
