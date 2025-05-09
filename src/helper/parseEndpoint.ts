export enum Endpoint {
    USERS = "/api/users",
    USERS_WITH_ID = "/api/users/:userId",
  }

export interface EndpointData {
    endpoint: Endpoint;
    userId?: string;
  }
  

export const parseEndpoint = (endpoint: string): EndpointData | null   => {
	if (/^\/api\/users\/?$/.test(endpoint)) {
		return {
			endpoint: Endpoint.USERS,
		};
	}
  
	if (/^\/api\/users\/[^/]+$/.test(endpoint)) {
		const userId = endpoint.match(/[^/]+$/)?.[0] ?? "";
  
		return {
			endpoint: Endpoint.USERS_WITH_ID,
			userId,
		};
	}
	return null;
};