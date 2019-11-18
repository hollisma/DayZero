import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSearchProfiles } from "../../actions/profile";
import Avatar from "react-avatar";
import { CATEGORIES } from "../../utils/consts";

import "./Search.css";

const Search = ({ auth: { user }, getSearchProfiles }) => {
  // var [searchString, setSearchString] = useState([]);
  var [searchProfiles, setSearchProfiles] = useState([]);
  var [searchCategories, setSearchCategories] = useState([]);

  useEffect(() => {
    getSearchProfiles(searchCategories).then(res => {
      setSearchProfiles(res);
    });
  }, [getSearchProfiles, searchCategories]);

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
            style={{
              marginBottom: "1.5rem"
            }}
            href={profile && profile.user && "profile/" + profile.user._id}
          >
            <div className="result-person">
              <Avatar
                className="avatar"
                size="100"
                round
                src={profile && profile.user && profile.user.avatar}
              />
              <div className="name">
                {profile && profile.user && profile.user.name}
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
    getSearchProfiles(searchCategories).then(res => {
      setSearchProfiles(res);
    });
  };

  const categoryButtons = CATEGORIES.map(cat => {
    return (
      <button
        className={
          "ui blue button category-button " +
          (searchCategories.includes(cat) ? "" : "basic")
        }
        style={{ margin: "5px" }}
        onClick={e => handleCategoryChange(e, cat)}
        key={cat}
      >
        {cat}
      </button>
    );
  });

  return (
    <div id="search-page">
      <div className="search-categories">
        {categoryButtons}
        {/* <form onSubmit={e => handleSearchSubmit(e)}>
          <input type="submit" style={{ display: "none" }} />
          <input type="text" onChange={e => handleSearchChange(e)} />
        </form> */}
      </div>
      <div className="results">{SearchProfileComponents}</div>
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
