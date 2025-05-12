import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaHome } from 'react-icons/fa';
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Close dropdown if clicked outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-bottom shadow-sm fixed-top">
      <div className="container-fluid max-w-1200 mx-auto px-4 d-flex align-items-center justify-content-between">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <FaHome /> Parcel Tracker
        </Link>
        <ul className="navbar-nav d-flex flex-row align-items-center gap-3 mb-0">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'nav-link text-primary' : 'nav-link text-light'
              }
            >
              Home
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <NavLink
                  to={user.role === 'admin' ? '/admin' : '/user'}
                  className={({ isActive }) =>
                    isActive ? 'nav-link text-primary' : 'nav-link text-light'
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item dropdown position-relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="btn btn-dark d-flex align-items-center gap-2 fs-5 text-light"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-label="User profile menu"
                >
                  <FaUserCircle size={26} />
                  {user.username}
                </button>
                {dropdownOpen && (
                  <div
                    className="profile-dropdown position-absolute bg-secondary rounded shadow-lg"
                    style={{ right: 0, top: '110%', minWidth: '140px', zIndex: 2000 }}
                  >
                    <button
                      type="button"
                      className="dropdown-item bg-transparent text-light"
                      onClick={logout}
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? 'nav-link text-primary' : 'nav-link text-light'
                  }
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? 'nav-link text-primary' : 'nav-link text-light'
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
