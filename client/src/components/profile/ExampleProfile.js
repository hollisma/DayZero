import React from 'react';

import './profile.css';

const ExampleProfile = ({ firstName }) => {
  return (
    <div>
      {firstName === 'dan' ? (
        <div className='lower'>
          <img
            src={require('../../img/dan.svg')}
            alt='Dan Kim'
            className='circular-pic'
          />
          <div className='name'>Dan Kim</div>
          <div className='about dan'>
            Dan aspires to be the best cellist of this generation but enjoys
            music of all kinds, having produced multiple rap albums as well. He
            wants to meet other icons at Princeton who enjoy creating art.
          </div>
        </div>
      ) : (
        <div className='upper'>
          <img
            src={require('../../img/carina.svg')}
            alt='Carina Lewis'
            className='circular-pic'
          />
          <div className='name carina'>Carina Lewis</div>
          <div className='about'>
            Carina is a CS junior and founder of three companies. She recently
            fell in love with yoga and wants to meet people who are as
            passionate about mindfulness and tech as she is.
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleProfile;
