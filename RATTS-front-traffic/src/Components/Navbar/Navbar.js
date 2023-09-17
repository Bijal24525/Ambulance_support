import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to import your CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to='/'><button className="nav-button">Home</button></Link>
      <Link to='/traffic'><button className="nav-button">Traffic Detail</button></Link>
      <Link to='/driver'><button className="nav-button">Driver Detail</button></Link>
      <Link to='/map'><button className="nav-button">Route Information</button></Link>
      {/* <Link to='/contact'><button className="nav-button">Chat</button></Link> */}
    </div>
  );
}

export default Navbar;
