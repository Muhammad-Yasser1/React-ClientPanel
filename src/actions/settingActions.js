import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  DISABLE_REGISTERATION
} from "../actions/types";

export const disableBalanceOnAdd = () => ({
  type: DISABLE_BALANCE_ON_ADD
});
export const disableBalanceOnEdit = () => ({
  type: DISABLE_BALANCE_ON_EDIT
});
export const disableRegisteration = () => ({
  type: DISABLE_REGISTERATION
});
