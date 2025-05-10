import { User } from "./user.model";

export interface StorageInterface {
    getAllUsers: () => Promise<User[]>;

    getUserById: (id: string) => Promise<User | null>;

    createUser: (fields: User) => Promise<User>;

    updateUser: (id: string, fields: Partial<User>) => Promise<User | null>;

    deleteUser: (id: string) => Promise<User | null>;
}