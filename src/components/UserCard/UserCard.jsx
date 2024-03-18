import "./UserCard.css"
import { Link } from "react-router-dom";


const UserCard = ({ user }) => {

    return (
        <Link to ={`/members/${user.username}`}>
            <li className="user-card">
                {user.avatar_url ? (<img src={user.avatar_url} alt="member avatar"/>) : (<p className="no-avatar">?</p>)} 
                <h3>{user.username}</h3>
            </li>
        </Link>
    )
}

export default UserCard;