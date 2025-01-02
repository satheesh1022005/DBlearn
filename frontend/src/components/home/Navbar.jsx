import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #007bff',
        padding: '10px 20px',
      }}
    >
      <div className="container-fluid">
        {/* Company Name */}
        <a
          className="navbar-brand"
          href="/landing"
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#007bff',
          }}
        >
          Database Learning Platform
        </a>

        {/* Responsive Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end ${
            isOpen ? 'show' : ''
          }`}
          id="navbarNav"
        >
          {/* Profile and Logout */}
          <ul className="navbar-nav">
            
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                style={{
                  color: '#dc3545',
                  fontWeight: '500',
                  fontSize: '1rem',
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
