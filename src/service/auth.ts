import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "./axios-instance";

export default {
	checkToken: async () => {
		try {
			const storage = await AsyncStorage.getItem("token");
			let token;
			if (storage) {
				token = JSON.parse(storage).state;
			}

			const req = await instance.post("/auth/refresh", token);
			return await req.data;
		} catch (error) {
			console.log(error);
		}
	},

	signIn: async (credentials: { email: string; password: string }) => {
		const req = await instance.post("/auth/login", credentials);
		return await req.data;
	},

	signUp: async (credentials: {
		name: string;
		email: string;
		password: string;
	}) => {
		const req = await instance.post("/user", credentials);
		return await req.data;
	},

	logout: async () => {
		try {
			const storage = await AsyncStorage.getItem("token");
			let token;
			if (storage) {
				token = JSON.parse(storage).state;
			}
			await instance.post("/auth/logout", token);
		} catch (error) {
			console.log(error);
		}
	}
};
