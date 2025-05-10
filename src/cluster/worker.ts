import { createServer } from "http";
import { Router } from "../router/router";
import { getRoutes } from "../router/routes";

const PORT=process.env.PORT ?? 4000;

export const createWorker = ()=>{
	const router = new Router();

	// create shared service for worker
	getRoutes(true).forEach(route => {
		router.addRoute(route.method, route.path, route.handler);
	});
    
	const server = createServer((req, res) => router.handleRequest(req, res));
    
	process.on("message", (msg) => {
		// Просто пересылаем сообщения
		if (process.send) {
			process.send(msg);
		}
	});
    
	server.listen(PORT, () => {
		console.log(`Worker is running on port ${PORT}`);
	});
};

