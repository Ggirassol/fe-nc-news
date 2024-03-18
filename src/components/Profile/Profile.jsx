import { useContext } from "react";
import UserContext from "../../contexts/User";
import "./Profile.css"

const Profile = () => {
    const { currUser } = useContext(UserContext);
    return (
        <div className="profile">
            <img src={currUser.avatar_url} alt='my profile avatar'/> 
            <p><b>Username: </b>{currUser.username}</p>
            <p><b>Name: </b>{currUser.name}</p>
        </div>
        )
}

export default Profile;