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
      <Link to='/list' style={{textDecoration:"none"}}><h1 id="suncatcher">Suncatcher</h1></Link>
      {/* {props.user && <div id="welcome"> Welcome, <b>{props.user.username}</b>!</div>}  */}
      {props.user ? (
          <>
            <div className="twoparts">
              {/* <div><Link to='/list'><button className="part" variant="danger">Explore</button></Link></div>  */}
              <div><Link to ="/profile"><img className="part" id="icon" src={profileIcon} style={{width: "25px"}} alt="profile"/></Link></div>
              <div><Link to='/' onClick={() => handleLogout(props)}><button className="part" id="logout" variant="danger">Logout </button></Link></div>  
            </div>
          </>
      ) : (
          <>
          <div className="twoparts">
              <div><Link to='/signup'><button className="part" variant="danger">Signup</button></Link></div>
              <div><Link to='/login'><button className="part" id="login" variant="danger">Login</button></Link></div>
          </div>
          </>
        )}
    </nav>
  )
}
export default Navbar;