import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { getDefaultRoute } from '../routing/default_types';
import { GUEST } from '../../actions/types';

const Login = ({ login, auth: { isAuthenticated, user } }) => {
  const [formData, setFromData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    // return <Redirect to='/dashboard' />; throws the error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
    const userType = user ? user.user_type : GUEST;
    return (
      <Redirect to={getDefaultRoute(userType)} />
    ); /* this still sets my userType to GUEST even though I logged in*/
  }

  return (
    <Fragment>
      <h1 className='larger text-primary'>Sign In</h1>
      <p className='lead my-2'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='ui form' onSubmit={e => onSubmit(e)}>
        <div className='field'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='field'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='ui button my-1' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
