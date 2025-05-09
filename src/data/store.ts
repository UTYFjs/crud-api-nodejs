import { User } from "./user.model";
export class Storage{
	private static instance: Storage;
	private users: Map<string, User> = new Map();
	private constructor(){}

	static getInstance(): Storage {
		if (!Storage.instance) {
			Storage.instance = new Storage();
		}
		return Storage.instance;
	}

	getAllUsers(): User[] {
		return Array.from(this.users.values());
	}

	getUserById(id: string): User | undefined {
		return this.users.get(id);
	}

	createUser(user: User): User {
		this.users.set(user.id, user);
		return user;
	}

	updateUser(id: string, user: Partial<User>): User | undefined {
		if (this.users.has(id)) {
			const updatedUser: User = {...this.users.get(id),...user} as User;
			this.users.set(id, updatedUser);
			return updatedUser;
		}
		return undefined;
	}

	async deleteUser(id: string): Promise<boolean> {
		return this.users.delete(id);
	}


}

// export class UserModel {
//     private static instance: UserModel;
//     private users: Map<string, User> = new Map();

//     private constructor() {}

//     static getInstance(): UserModel {
//         if (!UserModel.instance) {
//             UserModel.instance = new UserModel();
//         }
//         return UserModel.instance;
//     }

//     getAll(): User[] {
//         return Array.from(this.users.values());
//     }

//     getById(id: string): User | undefined {
//         return this.users.get(id);
//     }

//     create(user: User): User {
//         this.users.set(user.id, user);
//         return user;
//     }

//     update(id: string, user: User): User | undefined {
//         if (this.users.has(id)) {
//             this.users.set(id, user);
//             return user;
//         }
//         return undefined;
//     }

//     delete(id: string): boolean {
//         return this.users.delete(id);
//     }
// }