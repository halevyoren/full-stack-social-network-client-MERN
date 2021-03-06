import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaUser } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Navbar.css';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <div className='center-icon'>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        <li>
          <Link to='/posts'>Posts</Link>
        </li>
        <li>
          <Link className='center-icon' to='/dashboard'>
            <FaUser />
            <span className='hide-sm-screen'>&nbsp; Dashbord</span>
          </Link>
        </li>
        <li>
          <Link className='center-icon' onClick={logout} to='#!'>
            <GoSignOut /> <span className='hide-sm-screen'> &nbsp; Logout</span>
          </Link>
        </li>
      </div>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </ul>
  );
  return (
    <div className='navbar'>
      <h1>
        <Link to='/'>
          <div className='center-icon'>
            <FaCode />
            SocialWeb
          </div>
        </Link>
      </h1>
      {!loading && (
        <Fragment>
          <div className='navbar-left-links'>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProrps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProrps, { logout })(Navbar);
