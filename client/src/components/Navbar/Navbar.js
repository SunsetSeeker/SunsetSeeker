import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../../services/auth';
import profileIcon from './profile-icon.png';
import './Navbar.css'; 

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};
const Navbar = props => {
  return (
    <nav>
      <div className="suncatcher">
      {/* <Link to='/list' style={{textDecoration:"none"}}> */}
        <h1>Suncatcher</h1>
        {/* </Link> */}
      </div>
      {/* {props.user && <div id="welcome"> Welcome, <b>{props.user.username}</b>!</div>}  */}
      {props.user ? (
          <>
          <div className="twoButtons">
            {/* <div className="twoparts"> */}
              {/* <div><Link to='/list'><button className="part" variant="danger">Explore</button></Link></div>  */}
              <Link to ="/profile"><img className="iconButton" src={profileIcon} style={{width: "25px"}} alt="profile" /></Link>
              <Link to='/' onClick={() => handleLogout(props)}><button className="whiteButton">Logout </button></Link> 
              </div>
            {/* </div> */}
          </>
      ) : (
          <>
          {/* <div className="twoparts"> */}
          <div className="twoButtons">
              <Link to='/signup'><button className="otherButton">Signup</button></Link>
              <Link to='/login'><button className="whiteButton">Login</button></Link>
          </div>
          {/* </div> */}
          </>
        )}
    </nav>
  )
}
export default Navbar;