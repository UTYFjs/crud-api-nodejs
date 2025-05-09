import { User } from "../data/user.model";
// import { UserController } from "../controller/user.controller";
import { UserService } from "../services/user.service";
import { Handler } from "./router";

interface Route {
    method: string;
    path: string;
    handler: Handler;
}
// const controller = new UserController()
const service = new UserService();

export const routes: Route[] = [
	{
		method: "GET",
		path: "/api/users",
		handler: async (req, res) => {
			console.log("Handler",req.method, req.url,);
			// Логика для получения всех пользователей
			// const users = controller.getUsers(req, res)
			const users = await service.getAllUsers();
			console.log("USERDs ROUTE Handle", users);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify( users)); // Пример ответа
		}
	},
	{
		method: "GET",
		path: "/api/users/:userId",
		handler: async (req, res) => {
			console.log("Handler",req.method, req.url,);
			const userId = req.url?.split("/").pop() || "";
			// Логика для получения пользователя по ID
			if (!isValidUUID(userId)) {
				res.writeHead(400, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "Invalid userId format" }));
				return;
			}
			const user = await service.getUserById(userId);

			console.log("GET USerID", user);
			// Здесь должна быть логика поиска пользователя
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(user)); // Пример ответа
		}
	},
	{
		method: "POST",
		path: "/api/users",
		handler: (req, res) => {
			console.log("Handler",req.method, req.url,);
			let body = "";
			req.on("data", chunk => {
				body += chunk.toString();
			});

			req.on("end", async() => {
				const newUser = JSON.parse(body);
				console.log("newUser",newUser);
				// const users = controller.createUser(req, res)
				// const user = service.createUser(new User(newUser.username, newUser.age, newUser.hobbies));
				const user = await service.createUser(newUser.username, newUser.age, newUser.hobbies);
				// if (!newUser.name || !newUser.email) {
				//     res.writeHead(400, { 'Content-Type': 'application/json' });
				//     res.end(JSON.stringify({ message: 'Missing required fields' }));
				//     return;
				// }
				res.writeHead(201, { "Content-Type": "application/json" });
				res.end(JSON.stringify(user)); // Возвращаем созданного пользователя
			});
		}
	},
	{
		method: "PUT",
		path: "/api/users/:userId",
		handler: async (req, res) => {
			let body ="";
			req.on("data", chunk => {
				body += chunk.toString();
			});

			const userId = req.url?.split("/").pop() || "";
			// if (!isValidUUID(userId)) {
			// 	res.writeHead(400, { "Content-Type": "application/json" });
			// 	res.end(JSON.stringify({ message: "Invalid userId format" }));
			// 	return;
			// }

			req.on("end", async ()=>{
				const newUser = JSON.parse(body);
				console.log("NEW USER PUT", newUser);
				service.updateUser(userId, newUser.username, newUser.age, newUser.hobbies );
				// Логика для обновления пользователя
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ id: userId, name: "Updated User" })); // Пример ответа
			});
          
		}
	},
	{
		method: "DELETE",
		path: "/api/users/:userId",
		handler: async (req, res) => {
			console.log("Handler",req.method, req.url,);
			const userId = req.url?.split("/").pop() || "";
			// if (!isValidUUID(userId)) {
			// 	res.writeHead(400, { "Content-Type": "application/json" });
			// 	res.end(JSON.stringify({ message: "Invalid userId format" }));
			// 	return;
			// }
			// Логика для удаления пользователя
	


			console.log("ROUTER deleteUser", userId);
			const userDeleted = await service.deleteUser(userId);

			res.writeHead(204);
			res.end();
		

		}
	}
];


// Функция для проверки формата UUID
function isValidUUID(id: string): boolean {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	return uuidRegex.test(id);
}