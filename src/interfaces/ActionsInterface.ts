import { ActionType } from "redux/types";

interface setLogin {
  type: ActionType.SET_LOGIN;
  user: string;
  token: string;
  role: string;
}

export type ActionsInterface = setLogin;
