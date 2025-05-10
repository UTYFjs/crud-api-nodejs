import { StorageInterface } from "./StorageInterface";
import { User } from "./user.model";
export class Storage implements StorageInterface {
	private static instance: Storage;
	private users: Map<string, User> = new Map();
	 constructor(){}

	async getAllUsers() {
		return Array.from(this.users.values());
	}

	async getUserById(id: string): Promise<User | null> {
		return this.users.get(id) || null;
	}

	async createUser(user: User) {
		this.users.set(user.id, user);
		return user;
	}

	async updateUser(id: string, user: Partial<User>): Promise<User | null>  {
		if (this.users.has(id)) {
			const updatedUser: User = {...this.users.get(id),...user} as User;
			this.users.set(id, updatedUser);
			return updatedUser;
		}
		return null;
	}

	async deleteUser(id: string): Promise<User | null> {
		const deletedUser = this.users.get(id);
		const isDeleteUser = this.users.delete(id);
		return isDeleteUser && deletedUser ?  deletedUser : null;
	}


}

export const DB = new Storage();
