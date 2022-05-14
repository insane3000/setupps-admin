import { ActionType } from "redux/types";
import { Dispatch } from "redux";
import { ActionsInterface } from "interfaces/ActionsInterface";

// !Seteando LOGIN
export const setLogin =
  (user: string, token: string, role: string) => (dispatch: Dispatch<ActionsInterface>) => {
    // console.log(data);
    dispatch({
      type: ActionType.SET_LOGIN,
      user,
      token,
      role,
    });
  };
