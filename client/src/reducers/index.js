import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import schedule from "./schedule";
import group from "./group";

export default combineReducers({ auth, profile, schedule, group });
