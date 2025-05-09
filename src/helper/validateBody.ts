import { User } from "../data/user.model";

export const validateBody = async (body: User) => {
	
	if(typeof body?.username === "string"&& body?.username.length>0 && typeof body?.age === "number" && Array.isArray(body?.hobbies)) {
		return true;
	}

	return false;
};


export const validatePUTBody = async (body: Partial<User>) => {
	if (Object.keys(body).length === 0) {
		return false; 
	}

	if (body.username && typeof body.username !== "string") {
		return false;
	}

	if (body.age && typeof body.age !== "number") {
		return false;
	}

	if (body.hobbies && !Array.isArray(body.hobbies)) {
		return false;
	}

	if (body.hobbies) {
		for (const hobby of body.hobbies) {
			if (typeof hobby !== "string") {
				return false; 
			}
		}
	}

	return true; 
};
