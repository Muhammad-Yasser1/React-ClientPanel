import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  DISABLE_REGISTERATION
} from "../actions/types";

let initialState = {
  DISABLE_BALANCE_ON_ADD: false,
  DISABLE_BALANCE_ON_EDIT: false,
  DISABLE_REGISTERATION: false
};
if (localStorage.getItem("settings") == null) {
  localStorage.setItem("settings", JSON.stringify(initialState));
} else {
  initialState = JSON.parse(localStorage.getItem("settings"));
}

export default function(state = initialState, { type }) {
  let currentSettings = JSON.parse(localStorage.getItem("settings"));
  switch (type) {
    case DISABLE_BALANCE_ON_ADD:
      currentSettings.DISABLE_BALANCE_ON_ADD = !state.DISABLE_BALANCE_ON_ADD;
      localStorage.setItem("settings", JSON.stringify(currentSettings));
      return {
        ...state,
        DISABLE_BALANCE_ON_ADD: !state.DISABLE_BALANCE_ON_ADD
      };
    case DISABLE_BALANCE_ON_EDIT:
      currentSettings.DISABLE_BALANCE_ON_EDIT = !state.DISABLE_BALANCE_ON_EDIT;
      localStorage.setItem("settings", JSON.stringify(currentSettings));
      return {
        ...state,
        DISABLE_BALANCE_ON_EDIT: !state.DISABLE_BALANCE_ON_EDIT
      };
    case DISABLE_REGISTERATION:
      currentSettings.DISABLE_REGISTERATION = !state.DISABLE_REGISTERATION;
      localStorage.setItem("settings", JSON.stringify(currentSettings));
      return { ...state, DISABLE_REGISTERATION: !state.DISABLE_REGISTERATION };
    default:
      return state;
  }
}
