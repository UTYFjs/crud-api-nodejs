export const enum UserActions {
    GET_USERS = "GET_USERS",
    GET_USER_BY_ID = "GET_USER_BY_ID",
    ADD_USER = "ADD_USER",
    UPDATE_USER_BY_ID = "UPDATE_USER_BY_ID",
    REMOVE_USER_BY_ID = "REMOVE_USER_BY_ID",
    HAS_USER = "HAS_USER",
  }

export type ProcessMessage<T> = {
    data?: T;
    status?: number;
    message: string;
  };

export type Message = {
    action: string;
    payload: {
      id?: string;
      fields?: {
        [key: string]: string | string[] | number;
      };
    };
    data?: Record<string, string | number | string[]>
  };