import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSearchProfiles } from "../../actions/profile";
import Avatar from "react-avatar";
import { CATEGORIES, MAJORS, MINORS } from "../../utils/consts";

import { Dropdown } from 'semantic-ui-react'
import "./Search.css";

const Search = ({ auth: { user }, getSearchProfiles }) => {
  // var [searchString, setSearchString] = useState([]);
  var [searchProfiles, setSearchProfiles] = useState([]);
  var [searchCategories, setSearchCategories] = useState([]);
  var [searchFilters, setSearchFilters] = useState({
    'year': '',
    'major': '',
    'minor': ''
  })

  useEffect(() => {
    getSearchProfiles(searchCategories, searchFilters).then(res => {
      setSearchProfiles(res);
    });
  }, [getSearchProfiles, searchCategories, searchFilters]);

  // var handleSearchChange = e => {
  //   var str = e.target.value;
  //   setSearchString(str);
  // };

  // var handleSearchSubmit = e => {
  //   e.preventDefault();

  //   setSearchCategories(
  //     searchString.split(",").map(s => (s || "").replace(/^\s+|\s+$/g, ""))
  //   );
  //   getSearchProfiles(searchCategories).then(res => {
  //     setSearchProfiles(res);
  //   });
  // };

  let SearchProfileComponents = (
    <Fragment>
      {searchProfiles &&
        searchProfiles.map(profile => (
          <a
            href={profile && profile.user && "profile/" + profile.user._id}
            key={profile && profile.user && profile.user._id}
          >
            <div className="result-person">
              <div className="avatar-name">
                <Avatar
                  className="avatar"
                  size="75"
                  round
                  src={profile && profile.user && profile.user.avatar}
                />
                <div className="name">
                  {profile && profile.user && profile.user.name}
                </div>
              </div>
              <div className="categories-likes">
                <div className="categories">
                  {profile &&
                    profile.categories.slice(0, 5).map(category => (
                      <div className="profile-categories" key={category}>
                        {category}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </a>
        ))}
    </Fragment>
  );

  var handleCategoryChange = (e, cat) => {
    e.preventDefault();
    let temp = searchCategories;
    if (searchCategories.includes(cat)) {
      temp.splice(searchCategories.indexOf(cat), 1);
    } else {
      temp.push(cat);
    }
    setSearchCategories(temp);
    getSearchProfiles(searchCategories, searchFilters).then(res => {
      setSearchProfiles(res);
    });
  };

  const categoryButtons = CATEGORIES.map(cat => {
    return (
      <button
        className={
          "ui mini blue button category-button " +
          (searchCategories.includes(cat) ? "" : "basic")
        }
        style={{ margin: "5px", fontWeight: "bold" }}
        onClick={e => handleCategoryChange(e, cat)}
        key={cat}
      >
        {cat}
      </button>
    );
  });

  const onDropdownChange = (_, val) => {
    const value = val.value
    const name = val.name
    setSearchFilters({ ...searchFilters, [name]: value })

    getSearchProfiles(searchCategories, searchFilters).then(res => {
      setSearchProfiles(res);
    });
  }

  const classOptions = ['2024', '2023', '2022', '2021', 'Grad'].map(year => (
    { key: year, text: year, value: year }
  ))

  const majorOptions = MAJORS.map(m => (
    { key: m[0], text: m[1], value: m[0] }
  ))

  const minorOptions = MINORS.map(m => (
    { key: m, text: m, value: m }
  ))

  return (
    <div id="search-page">
      <div className="left">
        <div className="search-categories">
          <Dropdown 
            className='filter'
            placeholder='Class' 
            selection clearable
            name='year' 
            options={classOptions} 
            onChange={onDropdownChange} 
            value={searchFilters.year} 
          />
          <Dropdown 
            className='filter'
            placeholder='Major' 
            selection clearable
            name='major' 
            options={majorOptions} 
            onChange={onDropdownChange} 
            value={searchFilters.major} 
          />
          <Dropdown 
            className='filter'
            placeholder='Minor' 
            selection clearable
            name='minor' 
            options={minorOptions} 
            onChange={onDropdownChange} 
            value={searchFilters.minor} 
          />
          {categoryButtons}
        </div>
      </div>
      <div className="right">
        <div className="results">{SearchProfileComponents}</div>
      </div>
    </div>
  );
};

Search.propTypes = {
  getSearchProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getSearchProfiles })(Search);
