import { useEffect, useState } from "react";
import { getSingleUser } from "../../../api";
import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import "./SingleUser.css"

const SingleUser = () => {

    const {username} = useParams();
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [beError, setBeError] = useState(null);

    useEffect(() => {
        getSingleUser(username).then((data) => {
            setIsLoading(true)
            setUser(data.data.user)
            setIsLoading(false)
        }).catch((err) => {
            setBeError(err);
          });
    }, [])

    return beError ? 
    (<ErrorPage beError={beError} setBeError={setBeError}/>) :
    (isLoading ?
        (<h4 className="loading">Loading member...</h4>) :
        (<div className=" single-user">
            <img src={user.avatar_url} alt='profile avatar'/> 
            <p><b>Username: </b>{user.username}</p>
            <p><b>Name: </b>{user.name}</p>
        </div>
    ))
}

export default SingleUser;