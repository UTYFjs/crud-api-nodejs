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
	async createUser(username: string, age: number, hobbies: string[]): Promise<User> {

		const user = new User(username, age, hobbies);
		return this.model.createUser(user);
	}

	async updateUser(id: string, username?: string, age?: number, hobbies?: string[]): Promise<User | undefined> {
		// const user = new User(username, age, hobbies);
		// user.id = id;
		const updatedBody: Partial<User> = {};
		if(username){updatedBody.username = username;}
		if(age){updatedBody.age = age;}
		if(hobbies){updatedBody.hobbies = hobbies;}
		return this.model.updateUser(id, updatedBody);
	}

	async deleteUser(id: string): Promise<boolean> {
		return this.model.deleteUser(id);
	}
}