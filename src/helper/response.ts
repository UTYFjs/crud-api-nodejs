import { ServerResponse } from "http";
import { User } from "../data/user.model";

//TODO check types
export const sendResponse = (res: ServerResponse, statusCode: number, body?: Record<string, string | number | string[]> | User | User[] | null ) => {
  				res.writeHead(statusCode, { "content-Type": "application/json" });
	        res.end(JSON.stringify(body));
};

export const sendError = (res: ServerResponse, statusCode: number, message: string) => {
    				res.writeHead(statusCode, { "content-Type": "application/json" });
	          res.end(JSON.stringify({error: message}));
};