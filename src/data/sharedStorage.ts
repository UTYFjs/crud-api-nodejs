import process from "node:process";
import { StorageInterface } from "./StorageInterface";
import { User } from "./user.model";
import { ProcessMessage, UserActions } from "../types/userActions";

export class SharedStorage implements StorageInterface {
	public async getAllUsers(): Promise<User[]> {
		return this.createRequest<User[]>({
			action: UserActions.GET_USERS,
		});
	}

	public async getUserById(id: string): Promise<User | null> {
		return this.createRequest<User | null>({
			action: UserActions.GET_USER_BY_ID,
			payload: { id },
		});
	}

	public async createUser(fields: User): Promise<User> {
		return this.createRequest<User>({
			action: UserActions.ADD_USER,
			payload: { fields },
		});
	}

	public async updateUser(id: string, fields: Partial<User>): Promise<User | null> {
		console.log("PUT Worker message", id, fields);
		return this.createRequest<User | null>({
			action: UserActions.UPDATE_USER_BY_ID,
			payload: { id, fields },
		});
	}

	public async deleteUser(id: string): Promise<User | null> {
		return this.createRequest<User | null>({
			action: UserActions.REMOVE_USER_BY_ID,
			payload: { id },
		});
	}

	private async createRequest<T>(action: { [key: string]: string | object }): Promise<T> {
		return new Promise((resolve, reject) => {
			process.send?.(action);

			process.once("message", (message: ProcessMessage<T>) => {
				if (message.data || message.data === null) {
					resolve(message.data);
				} else {
					reject(message.message);
				}
			});
		});
	}
}
