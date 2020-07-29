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
      {props.user && <div> Welcome, {props.user.username}!</div>}
              
              <Link to='/list'>Explore</Link>
              <Link to ="/profile"><img src={profileIcon} style={{width: "30px"}} alt="profile"/></Link>
              
      {props.user ? (
          <>
              <Link to='/' onClick={() => handleLogout(props)}>
                Logout
              </Link>
          </>
      ) : (
          <>
              <Link to='/signup'>Signup</Link>
              <Link to='/login'>Login</Link>
          </>
        )}
    </nav>
  )
}

export default Navbar;