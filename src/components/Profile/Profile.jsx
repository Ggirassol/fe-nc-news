import { useContext } from "react";
import UserContext from "../../contexts/User";
import "./Profile.css"

const Profile = () => {
    const { currUser } = useContext(UserContext);
    return (
        <div className="profile">
            <img src={currUser.avatar_url} alt='my profile avatar'/> 
            <h2>{currUser.username}</h2>
            <h3>{currUser.name}</h3>
        </div>
        )
}

export default Profile;