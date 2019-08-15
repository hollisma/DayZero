import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const GroupMember = ({ member_id, college, major }) => {
  let res = "";
  // let [id, setId] = useState(member_id);
  // let [col, setCol] = useState(college);
  // let [maj, setMaj] = useState(major);
  // useEffect(() => {
  //   setId(member_id);
  //   setCol(college);
  //   setMaj(major);
  // }, [member_id, college, major]);
  res += member_id + " " + college + " " + major;
  // res += id + " " + col + " " + maj;

  return <div>{res || "Searching..."}</div>;
};

GroupMember.propTypes = {
  member_id: PropTypes.string.isRequired
};

export default GroupMember;
