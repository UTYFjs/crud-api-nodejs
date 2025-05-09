import { IncomingMessage, ServerResponse } from "http";

export type Handler = (req: IncomingMessage, res: ServerResponse) => void;

export enum StatusCode {
    OK = 200,
    CREATED =201,
    NO_CONTENT= 204,
    BAD_REQUEST = 400,
    NOT_FOUND= 404,
    METHOD_NOT_ALLOWED = 405,
    SERVER_ERROR = 500,
  }
export enum ErrorMessage {
    NOT_FOUND = "Not found endpoint",
    SERVER_ERROR = "Sorry, something went wrong",
    USER_NOT_FOUND = "User not found",
    USER_ID_INVALID = " User ID is invalid",
    REQUEST_URL_FORMAT_INVALID = "Request URL format is invalid",
    REQUEST_BODY_FORMAT_INVALID = "Request body format is invalid. Body should be {username: string, age: number, hobbies: string[]}",
    METHOD_NOT_ALLOWED = "Method not allowed",
  }

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    OPTIONS = "OPTIONS",
    HEAD = "HEAD"
}

export type HttpMethodHandlers  = {
    [key in HttpMethod]?: Handler;
};