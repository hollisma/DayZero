import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar_LoggedIn = ({ auth: { isAuthenticated, loading }, logout }) => {
  const handleScroll = () => {
    const navbar = document.getElementById('navbar');
    if (document.documentElement.scrollTop > 1) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.onscroll = function() {
    handleScroll();
  };

  const authLinks = (
    <ul className='right menu'>
      <li className='item'>
        <a href='#group' className='text-primary'>
          Group
        </a>
      </li>
      <li className='item'>
        <a href='#settings' className='reg'>
          Settings
        </a>
      </li>
      <li className='item'>
        <Link to='/how-it-works' className='reg'>
          How It Works
        </Link>
      </li>
      <li className='item'>
        <Link onClick={logout} to='/' className='text-secondary'>
          <i className='fas fa-sign-out-alt' /> Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='right menu'>
      <li className='item'>
        <a href='/#first' className='text-primary'>
          Your Day Zeros
        </a>
      </li>
      <li className='item'>
        <a href='/#second' className='reg'>
          Settings
        </a>
      </li>
      <li className='item'>
        <a href='/#third' className='reg'>
          How It Works
        </a>
      </li>
      <li className='item'>
        <Link to='/Register' className='text-secondary'>
          Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='ui secondary menu navbar' id='navbar'>
      <h1 className='item'>
        <Link to={isAuthenticated ? '/dashboard' : '/'}>Day Zero</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar_LoggedIn);