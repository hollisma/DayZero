import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import matchInfo from "./matchInfo";
import group from "./group";

export default combineReducers({ auth, profile, matchInfo, group });
