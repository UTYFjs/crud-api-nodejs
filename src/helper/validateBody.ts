import { User } from "../data/user.model";

export const validateBody = async (body: User) => {
	
	if(typeof body?.username === "string" && typeof body?.age === "number" && Array.isArray(body?.hobbies)) {
		return true;
	}

	console.log("validateBody", body);

	return false;
};