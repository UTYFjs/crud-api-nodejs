import { createLoadBalancer } from "./cluster/loadBalancer";
import { createServer, Server } from "http";
import { Router } from "./router/router";
import { getRoutes } from "./router/routes";
import { isMultiMode } from "./helper/isMultiMode";
import cluster from "cluster";

import  process  from "node:process";
import { createWorker } from "./cluster/worker";

export let server: Server;   

const PORT=process.env.PORT ?? 4000;
const isMulti = isMultiMode();

if(isMulti && cluster.isPrimary){
	createLoadBalancer();
}else if (isMulti && cluster.isWorker){
	createWorker();
}
else{
	const router = new Router();
	getRoutes(false).forEach(route => {
		router.addRoute(route.method, route.path, route.handler);
	});
	
	server = createServer((req, res) => router.handleRequest(req, res));
	
	server.listen(PORT, () => {
		console.log(` Server is running on port ${PORT}. PID: ${process.pid}`);
	});
	server.on("connection", () => {
		console.log(`Server ${PORT} is handling a request`);
	});
}


   