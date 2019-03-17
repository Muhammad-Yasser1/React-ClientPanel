import { NOTIFY_USER } from "../actions/types";

const initialState = {
  message: null,
  messageType: null
};

export default (state = initialState, { type, message, messageType }) => {
  switch (type) {
    case NOTIFY_USER:
      return { ...state, message, messageType };

    default:
      return state;
  }
};
