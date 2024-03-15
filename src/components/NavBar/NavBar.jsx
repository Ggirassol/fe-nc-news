import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/User";
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleIcon from '@mui/icons-material/People';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import "./NavBar.css";

const NavBar = ({ setOrder_by, setSort_by}) => {
  const { currUser } = useContext(UserContext);

  return (
    <nav className="nav-bar">
      <div className="first-section">
      <Link aria-label="homepage" onClick={() => {setOrder_by(null); setSort_by(null)}} className="icon" to="/"><HomeIcon/></Link>
      <span className="greeting">Hello {currUser.username}!</span>
      </div>
      <div className="second-section">
      <Link aria-label="write an article"className="icon" to={`/${currUser.username}/create`}><AddBoxIcon/></Link>
      <Link aria-label="members" className="icon" to="/members"><PeopleIcon/></Link>
      <Link aria-label="My library" className="icon" to={`/${currUser.username}/library`}><AutoStoriesIcon/></Link>
      {currUser.avatar_url ? (
        <Link to={`/${currUser.username}/profile`}>
          <img src={currUser.avatar_url} alt="My Profile"/>
        </Link>
      ) : (
        <Link aria-label="My Profile" className="icon" to={`/${currUser.username}/profile`}><AccountCircleIcon/>
        </Link>
      )}
      </div>
    </nav>
  );
};

export default NavBar;
