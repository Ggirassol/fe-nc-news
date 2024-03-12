import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/User";
import "./NavBar.css";

const NavBar = () => {
  const { currUser } = useContext(UserContext);

  return (
    <nav className="nav-bar">
      <Link className="icon" to="/">Home</Link>
      <span>Hello {currUser.username}!</span>
      <Link className="icon" to={`/${currUser.username}/create`}>Create</Link>
      <Link className="icon" to="/members" >Members</Link>
      <Link className="icon" to={`/${currUser.username}/library`}>Library</Link>
      {currUser.avatar_url ? (
        <Link to={`/${currUser.username}/profile`}>
          <img src={currUser.avatar_url} alt="My Profile"/> Profile
        </Link>
      ) : (
        <Link className="icon" to={`/${currUser.username}/profile`}>Profile
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
