// import { UserModel } from "../models/UserModel";
import { User } from "../data/user.model";
import {Storage} from "../data/store";

export class UserService {
	private model: Storage;

	constructor() {
		this.model = Storage.getInstance();
	}

	async getAllUsers(): Promise<User[]> {
		return this.model.getAllUsers();
	}

	async getUserById(id: string): Promise<User | undefined> {
		return this.model.getUserById(id);
	}
	// async createUser(user: any) {
	// 	console.log("SERvice USER Create", user)
	//     this.model.createUser(user);
	//     return user;
	// }
	async createUser(username: string, age: number, hobbies: string[]): Promise<User> {

		const user = new User(username, age, hobbies);
		console.log("SERvice  Create", user);
		return this.model.createUser(user);
	}

	async updateUser(id: string, username: string, age: number, hobbies: string[]): Promise<User | undefined> {
		const user = new User(username, age, hobbies);
		user.id = id;
		return this.model.updateUser(id, user);
	}

	async deleteUser(id: string): Promise<boolean> {
		return this.model.deleteUser(id);
	}
}