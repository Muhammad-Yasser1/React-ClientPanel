import { NOTIFY_USER } from "./types";

export const notifyAction = (message, messageType) => ({
  type: NOTIFY_USER,
  message,
  messageType
});
