import { createServer, IncomingMessage, Server, ServerResponse } from "http";
// import { requestHandle } from "./controller/user.handle";
import { Router } from "./router/router";
import { routes } from "./router/routes";

export let server: Server;   

const PORT=process.env.PORT ?? 4000;


const router = new Router();
routes.forEach(route => {
	router.addRoute(route.method, route.path, route.handler);
});

server = createServer((req, res) => router.handleRequest(req, res));

server.listen(PORT, () => {
	console.log(` Server is running on port ${PORT}. PID: ${process.pid}`);
});
server.on("connection", () => {
	console.log(`Server ${PORT} is handling a request`);
});
   