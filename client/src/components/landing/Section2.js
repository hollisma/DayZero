import React from 'react';

const Section2 = () => {
  return (
    <div id='howitworks' className='light yellow chunk'>
      <div className='ui vertical stripe segment'>
        <h1>How Day Zero Works</h1>
        <div className='ui middle aligned stackable grid container howitworks-table'>
          <img
            src={require('../../img/rocket.svg')}
            className='svg-rocket'
            alt=''
          />
          <p>
            When you sign up, you tell us what kind of people you'd like to
            meet. People interested in art? Entrepreneurship? Music? Blockchain?
            Philosophy? You can select any number of interests and based on
            these, we will find matches for you.
          </p>
          <img
            src={require('../../img/calendar.svg')}
            className='svg-calendar'
            alt=''
          />
          <p>
            Set your calendar for the times you're free to grab a meal of coffee
          </p>
          <img
            src={require('../../img/people.svg')}
            className='svg-people'
            alt=''
          />
          <p>
            Based on your interests, Day Zero will automatically match you with
            three other people to have a meal or coffee!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
