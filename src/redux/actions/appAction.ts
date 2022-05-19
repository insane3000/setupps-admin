import { ActionType } from "redux/types";
import { Dispatch } from "redux";
import { ActionsInterface } from "interfaces/ActionsInterface";

// !Seteando LOGIN
export const setLogin = (token: string, id: string) => (dispatch: Dispatch<ActionsInterface>) => {
  // console.log(data);
  dispatch({
    type: ActionType.SET_LOGIN,
    token,
    id,
  });
};
