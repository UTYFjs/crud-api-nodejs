import { Worker } from "node:cluster";
import { Message, UserActions } from "../types/userActions";
import { User } from "../data/user.model";
import { ErrorMessage, StatusCode } from "../types/types";
import { UserService } from "../services/user.service";

export const createWorkerListener = (worker: Worker, sharedService: UserService ) => {

	return async (message: Message) => {
		if (message.action === undefined) {
			if(message?.data){
				process.send?.(message);
			}

			return Promise.resolve();
		}
		const id = message.payload?.id || "";

		const fields = message.payload?.fields || null;

		try {
			switch (message.action) {
			case UserActions.GET_USERS: {
				const data = await sharedService.getAllUsers();

				worker.send({ data });

				break;
			}

			case UserActions.GET_USER_BY_ID: {
				const data = await sharedService.getUserById(id) ;
				worker.send({ data });

				break;
			}

			case UserActions.ADD_USER: {
				const dto = fields  as unknown as User;
				const data = await sharedService.createUser(dto.username, dto.age, dto.hobbies );

				worker.send({ data });

				break;
			}

			case UserActions.UPDATE_USER_BY_ID: {
				const dto = fields  as Partial<User>;
				const data = await sharedService.updateUser(id, dto.username, dto.age, dto.hobbies );

				worker.send({ data });

				break;
			}

			case UserActions.REMOVE_USER_BY_ID: {
				const data = await sharedService.deleteUser(id);

				worker.send({ data });

				break;
			}

			default: {
				worker.send({
					status: StatusCode.SERVER_ERROR,
					message: ErrorMessage.SERVER_ERROR,
				});
			}
			}
		} catch {
			worker.send({
				status: StatusCode.SERVER_ERROR,
				message: ErrorMessage.SERVER_ERROR,
			});
		}
	};
};
