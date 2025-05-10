import { createServer, request } from "http";
import { createWorkerListener } from "./workerListener";
import cluster from "cluster";
import {Worker} from "cluster";
import { UserService } from "../services/user.service";
import { availableParallelism } from "os";
  
export const createLoadBalancer = ()=>{
	const PORT=process.env.PORT ?? 4000;
	const WORKER_BASE_PORT = +PORT + 1 ;

	const numCPUs = availableParallelism();

	//обычный сервис который отсылает resp
	const userService = new UserService(false);

	const workers: Worker[] = [];

	// Создание воркеров
	for (let i = 0; i < numCPUs; i++) {
		const workerPort = WORKER_BASE_PORT + i;
		const worker = cluster.fork({ PORT: workerPort });
		workers.push(worker);

		worker.on("message", createWorkerListener(worker, userService));

		worker.on("exit", (code, signal) => {
			console.log(`Worker ${worker.process.pid} died`, workers.length);

			const findIndexDiedWorker = workers.findIndex((worker1)=> worker1.process.pid == worker.process.pid);
			console.log("died worker", findIndexDiedWorker);
			const rebornWorkerPort = WORKER_BASE_PORT + findIndexDiedWorker;
			const rebornWorker = cluster.fork({ PORT: rebornWorkerPort });
			workers[findIndexDiedWorker] = rebornWorker;
			// cluster.fork();
			// workers.push(worker);
		});
	}


	let workerIndex = 0;

	const loadBalancer = createServer((req, res) => {
		//round robin
		const workerPort = WORKER_BASE_PORT + workerIndex;
    
		const options = {
			hostname: "localhost",
			port: workerPort,
			path: req.url,
			method: req.method,
			headers: req.headers,
		};
    
		const proxy = request(options, (proxyRes) => {
			// console.log("proxyRes", proxyRes);
			res.writeHead(proxyRes?.statusCode||500, proxyRes.headers);
			proxyRes.pipe(res, { end: true });
		});
    
		req.pipe(proxy, { end: true });
            
		workerIndex = (workerIndex + 1) % workers.length;
		proxy.on("error", () => {
			res.writeHead(502);
			res.end("Bad Gateway");
		});
	});
    
	loadBalancer.listen(PORT, () => {
		console.log(`Load Balancer is running on port ${PORT}`);
		console.log("Waiting for the workers to start....");
	});
};