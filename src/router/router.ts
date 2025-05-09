import { IncomingMessage, ServerResponse } from "http";
import { parseEndpoint } from "../helper/parseEndpoint";

export type Handler = (req: IncomingMessage, res: ServerResponse) => void;


export class Router {
	private routes: Map<string, Handler>;
	constructor() {
		this.routes = new Map();
	}

	addRoute(method: string, path: string, handler: Handler): void {
		this.routes.set(`${method}:${path}`, handler);
	}

	handleRequest(req: IncomingMessage, res: ServerResponse): void {

		const endpointData = parseEndpoint(req.url||"");

		const key = `${req.method}:${endpointData.endpoint || ""}`;
		console.log("endpointData", endpointData);
		const handler = this.routes.get(key);
		console.log("key handleRequest ROUTER", key);
		if (handler) {
			handler(req, res);
		} else {
			console.log("key handleRequest ROUTER", `${req.method}:${req.url || ""}`);
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Not Found" }));
		}
	}
}