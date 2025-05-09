import { IncomingMessage, ServerResponse } from "http";
import { parseEndpoint } from "../helper/parseEndpoint";
import { sendError } from "../helper/response";
import { ErrorMessage, Handler, HttpMethod, HttpMethodHandlers, StatusCode } from "../types/types";



export class Router {
	private routes: Map<string, HttpMethodHandlers >;
	constructor() {
		this.routes = new Map();
	}

	addRoute(method: string, path: string, handler: Handler): void {
	 // собираем коллекцию вида {'/route': {GET: hadler, PUT: handler}}:  Map<string, HttpMethodHandlers >
		this.routes.set(path, ({...this.routes.get(path), [method]: handler}));
	}

	handleRequest(req: IncomingMessage, res: ServerResponse): void {
		try{
			const endpointData = parseEndpoint(req.url||"");

			if(!endpointData) {
				sendError(res, StatusCode.NOT_FOUND, ErrorMessage.NOT_FOUND);
				return;
			}

			const routeHandlers = this.routes.get(endpointData.endpoint);

			if(routeHandlers){
				const handler = routeHandlers?.[req.method as HttpMethod];
				console.log("routeHandlers Method", req.method, handler);
				if(handler){
					handler(req, res);
				}else{
					sendError(res, StatusCode.METHOD_NOT_ALLOWED, ErrorMessage.METHOD_NOT_ALLOWED);
				}
			}else{
				console.log("key handleRequest ROUTER", `${req.method}:${req.url || ""}`);
				sendError(res, StatusCode.NOT_FOUND, ErrorMessage.NOT_FOUND);
			}
		}catch(e){
			console.log("Error try catch", e);
			sendError(res, StatusCode.SERVER_ERROR, ErrorMessage.SERVER_ERROR);
		}

	}
}