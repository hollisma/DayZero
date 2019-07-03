import { REGISTERED, PROFILED, MET } from "../../actions/types";

const GUEST_DEFAULT = "login";
const REGISTERED_DEFAULT = "profile";
const PROFILED_DEFAULT = "dashboard";
const MET_DEFAULT = "dashboard";

export const getDefaultRoute = userType => {
  switch (userType) {
    case REGISTERED:
      return REGISTERED_DEFAULT;
    case PROFILED:
      return PROFILED_DEFAULT;
    case MET:
      return MET_DEFAULT;
    default:
      return GUEST_DEFAULT;
  }
};
