import React from 'react'
import { Link } from 'react-router-dom'

const Restaurant_Nav = () => {
  return (
    <nav className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: '250px', position: 'fixed' }}>
    <div className="mb-4">
      <h4>Gourmetique</h4>
    </div>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link className="nav-link text-white" to="/resthome">Orders</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/menu">Menu</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/resads">Post New Ads</Link>
      </li>
      {/* <li className="nav-item">
        <Link className="nav-link text-white" to="/Weather">W</Link>
      </li> */}
      <li className="nav-item">
        <Link className="nav-link text-white" to="/resprofile">Profile</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/">LogOut</Link>
      </li>
    </ul>
  </nav>

  )
}

export default Restaurant_Nav