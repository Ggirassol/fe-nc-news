import "./AddArticle.css"
import { addArticle } from "../../../api";
import { useContext, useState } from "react";
import UserContext from "../../contexts/User";
import ErrorAddArticle from "./ErrorAddArticle";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
    const { currUser } = useContext(UserContext);
    const [topic, setTopic] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [img, setImg] = useState("");

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addArticle(currUser.username, title, body, topic, img).then((article) => {
            setTopic("");
            setTitle("");
            setBody("");
            setImg("");
            setError(false)
            setErrorMsg(null)
            console.log(article)
            navigate(`/articles/${article.data.newArticle.article_id}`);
        })
        .catch((err) => {
            setErrorMsg(err)
            setError(true);
            setTimeout(() => {
                setError(false);
              }, "2500");
          })
    }


    return (<form className="form" onSubmit={handleSubmit}>
        <label htmlFor="topic">Topic</label>
        <textarea id="topic" value={topic} onChange={(e) => {setTopic(e.target.value)}} rows="1" cols="10"></textarea>

        <label htmlFor="title">Title</label>
        <textarea id="title" value={title} onChange={(e) => {setTitle(e.target.value)}} rows="2" cols="10"></textarea>

        <label htmlFor="body">Article</label>
        <textarea id="body" value={body} onChange={(e) => {setBody(e.target.value)}} rows="15" cols="10"></textarea>

        <label htmlFor="img">Image Url</label>
        <textarea id="img" value={img} onChange={(e) => {setImg(e.target.value)}} rows="4" cols="10"></textarea>

        <input type="submit" value="Submit" className="submit-btn"/>
        {error && (<ErrorAddArticle key={errorMsg} msg={errorMsg}/>)}
    </form>
    )
};

export default AddArticle;