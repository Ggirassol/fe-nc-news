import "./AddComment.css"
import { addComment } from "../../../api";
import { useContext, useState } from "react";
import UserContext from "../../contexts/User";

const AddComment = ( {article_id, currComments, setCurrComments } ) => {
  const { currUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState("")
  const [isItPosting, setIsItPosting] = useState(false)
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(/\S/.test(newComment)) {
      setIsItPosting(true)
      addComment(article_id, currUser.username, newComment).then(({data}) => {
        setIsItPosting(false)
        setCurrComments([data.newComment, ...currComments])
        setNewComment("")
      })
    }
  }

  return (<form className = "form" onSubmit={handleSubmit}>
    <label htmlFor="new-comment">Add a comment</label>
    <textarea value={newComment} onChange={(e) => {setNewComment(e.target.value)}} id="new-coment" rows="8" cols="10"></textarea>
    {isItPosting ? (<p>Posting comment...</p>) : (<input type="submit" value="Submit" className="submit-btn"/>)}
  </form>
  )
};

export default AddComment;
