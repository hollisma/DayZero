import React from 'react';
import Login from '../auth/Login';
import { Link } from 'react-router-dom';

const Section1 = () => {
  return (
    <div id='home' className='chunk'>
      <div className='ui vertical stripe segment'>
        <h2>Sixty seconds to register.</h2>
        <h2>Grab meals with people who share your passions.</h2>
        <p>Only Available At: </p>
        <div className='images'>
          <img
            src={require('../../img/stanford.svg')}
            className='stanford'
            alt=''
          />
          <img
            src={require('../../img/princeton.svg')}
            className='princeton'
            alt=''
          />
        </div>
        <button className='ui button basic blue big'>
          <Link to='/register'>FIND YOUR DAY ZEROS</Link>
        </button>
      </div>
    </div>
  );
};

export default Section1;
