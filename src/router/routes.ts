import { validate } from "uuid";
import { sendError, sendResponse } from "../helper/response";
import { validateBody, validatePUTBody } from "../helper/validateBody";
import { UserService } from "../services/user.service";
import { ErrorMessage, Handler, HttpMethod, StatusCode } from "../types/types";

interface Route {
    method: HttpMethod;
    path: string;
    handler: Handler;
}

const service = new UserService();

export const routes: Route[] = [
	{
		method: HttpMethod.GET,
		path: "/api/users",
		handler: async (req, res) => {
			const users = await service.getAllUsers();
			sendResponse(res, StatusCode.OK, users);
		}
	},
	{
		method: HttpMethod.GET,
		path: "/api/users/:userId",
		handler: async (req, res) => {
			const userId = req.url?.split("/").pop() || "";

			if (!validate(userId)) {
				sendError(res, StatusCode.BAD_REQUEST, ErrorMessage.USER_ID_INVALID);
				return;
			}
			const user = await service.getUserById(userId);

			if(user){			
				sendResponse(res, StatusCode.OK, user);
			}
			else{
				sendError(res, StatusCode.NOT_FOUND, ErrorMessage.USER_NOT_FOUND);
			}
		}
	},
	{
		method: HttpMethod.POST,
		path: "/api/users",
		handler: (req, res) => {
			let body = "";
			req.on("data", chunk => {
				body += chunk.toString();
			});

			req.on("end", async() => {
				try{
					if(body){
						const newUser = JSON.parse(body);
						if(await validateBody(newUser)){
							const user = await service.createUser(newUser.username, newUser.age, newUser.hobbies);
							res.writeHead(201, { "Content-Type": "application/json" });
							res.end(JSON.stringify(user)); // Возвращаем созданного пользователя
						}else{
							sendError(res, StatusCode.BAD_REQUEST, ErrorMessage.REQUEST_BODY_FORMAT_INVALID);
						}
					}else{
						sendError(res, StatusCode.BAD_REQUEST, ErrorMessage.REQUEST_BODY_FORMAT_INVALID);
					}
				} catch{
					sendError(res, StatusCode.SERVER_ERROR, ErrorMessage.SERVER_ERROR);
				}
			});
		}
	},
	{
		method: HttpMethod.PUT,
		path: "/api/users/:userId",
		handler: async (req, res) => {
			let body ="";
			req.on("data", chunk => {
				body += chunk.toString();
			});

			const userId = req.url?.split("/").pop() || "";

			if (!validate(userId)) {
				sendError(res, StatusCode.BAD_REQUEST, ErrorMessage.USER_ID_INVALID);
				return;
			}

			const user = await service.getUserById(userId);

			if(!user){			
				sendError(res, StatusCode.NOT_FOUND, ErrorMessage.USER_NOT_FOUND);
				return;
			}



			req.on("end", async ()=>{
				try{

					
					const newUser = JSON.parse(body);


					if(await validatePUTBody(newUser)){
						const updatedUser = await service.updateUser(userId, newUser.username, newUser.age, newUser.hobbies );
					
						sendResponse(res, StatusCode.OK, updatedUser);
					}else{
						sendError(res, StatusCode.BAD_REQUEST, ErrorMessage.REQUEST_BODY_FORMAT_INVALID);
					}

					
				}catch{
					sendError(res, StatusCode.SERVER_ERROR, ErrorMessage.SERVER_ERROR);
				}

			});
          
		}
	},
	{
		method: HttpMethod.DELETE,
		path: "/api/users/:userId",
		handler: async (req, res) => {
			const userId = req.url?.split("/").pop() || "";
			if (!validate(userId)) {
				sendError(res, StatusCode.BAD_REQUEST, ErrorMessage.USER_ID_INVALID);
				return;
			}
	
			const userDeleted = await service.deleteUser(userId);

			if(userDeleted){
				sendResponse(res, StatusCode.NO_CONTENT);
			}else{
				sendError(res, StatusCode.NOT_FOUND, ErrorMessage.USER_NOT_FOUND);
			}
		}
	}
];