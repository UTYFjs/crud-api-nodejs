import { User } from "../data/user.model";
import {DB} from "../data/storage";
import { SharedStorage } from "../data/sharedStorage";
import { StorageInterface } from "../data/StorageInterface";

export class UserService {
	private model: StorageInterface;

	constructor(isCluster?: boolean) {
		this.model = isCluster ? new SharedStorage(): DB;
	}

	async getAllUsers(): Promise<User[]> {
		return this.model.getAllUsers();
	}

	async getUserById(id: string): Promise<User | null> {
		return this.model.getUserById(id);
	}
	async createUser(username: string, age: number, hobbies: string[]): Promise<User> {
		const user = new User(username, age, hobbies);
		return this.model.createUser(user);
	}

	async updateUser(id: string, username?: string, age?: number, hobbies?: string[]): Promise<User | null> {
		const updatedBody: Partial<User> = {};
		
		if(username){updatedBody.username = username;}
		if(age){updatedBody.age = age;}
		if(hobbies){updatedBody.hobbies = hobbies;}

		return this.model.updateUser(id, updatedBody);
	}

	async deleteUser(id: string): Promise<User | null> {
		return this.model.deleteUser(id);
	}
}