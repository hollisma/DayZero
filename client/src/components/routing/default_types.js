import {
  REGISTERED,
  PROFILED,
  SCHEDULED,
  GROUPED,
  MET
} from "../../utils/consts";

const GUEST_DEFAULT = "/";
const REGISTERED_DEFAULT = "/create-profile/#";
const PROFILED_DEFAULT = "/dashboard/#";
const SCHEDULED_DEFAULT = "/dashboard/#";
const GROUPED_DEFAULT = "/dashboard/#";
const MET_DEFAULT = "/dashboard/#";

export const getDefaultRoute = userType => {
  switch (userType) {
    case REGISTERED:
      return REGISTERED_DEFAULT;
    case PROFILED:
      return PROFILED_DEFAULT;
    case SCHEDULED:
      return SCHEDULED_DEFAULT;
    case GROUPED:
      return GROUPED_DEFAULT;
    case MET:
      return MET_DEFAULT;
    default:
      return GUEST_DEFAULT;
  }
};
