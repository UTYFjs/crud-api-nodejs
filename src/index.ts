import { createServer, IncomingMessage, Server, ServerResponse } from "http";

export let server: Server;   

const PORT=process.env.PORT ?? 4000;

server = createServer(async (/*req: IncomingMessage, res: ServerResponse<IncomingMessage>*/) => {
	// requestHandle(req, res);
});
server.listen(PORT, () => {
	console.log(` Server is running on port ${PORT}. PID: ${process.pid}`);
});
server.on("connection", () => {
	console.log(`Server ${PORT} is handling a request`);
});
   