import { ActionType } from "redux/types";

interface setLogin {
  type: ActionType.SET_LOGIN;
  token: string;
  id: string;
}

export type ActionsInterface = setLogin;
