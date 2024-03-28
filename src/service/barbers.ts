import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { instance } from "./axios-instance";

export const BarberService = {
	getBarbers: async (
		coords?: { lat?: number; lng?: number },
		adress?: string
	) => {
		try {
			let token = undefined;

			const storage = await AsyncStorage.getItem("token");

			if (storage) {
				token = JSON.parse(storage).state.token;
			}
			const res = await instance.get(
				`/barbers?token=${token}&lat=${coords?.lat}&long=${coords?.lng}&adress=${adress}`
			);

			return res.data;
		} catch (error) {
			console.log(error);
			Alert.alert("Erro", "Erro ao buscar barbeiros");
		}
	},

	getBarber: async (id: number) => {
		try {
			const storage = await AsyncStorage.getItem("token");
			let token = undefined;

			if (storage) {
				token = JSON.parse(storage).state.token;
			}

			const res = await instance.get(`/barber/${id}?token=${token}`);
			return res.data;
		} catch (error) {
			console.log("Erro: ", error);
		}
	},

	setFavorite: async (id: number) => {
		try {
			const storage = await AsyncStorage.getItem("token");
			let token = undefined;

			if (storage) {
				token = JSON.parse(storage).state.token;
			}

			const res = await instance.get(`/user/favorite/${id}?token=${token}`);
			return res.data;
		} catch (error) {
			console.log("Erro: ", error);
		}
	},

	setAppointment: async (input: {
		barberId: number;
		serviceId: number;
		day: number;
		time: string;
	}) => {
		// try {
		// 	const storage = await AsyncStorage.getItem("token");
		// 	let token = undefined;

		// 	if (storage) {
		// 		token = JSON.parse(storage).state.token;
		// 	}

		// 	const res = await instance.post(
		// 		`/user/appointment?token=${token}`,
		// 		input
		// 	);
		// 	return res.data;
		// } catch (error) {
		// 	console.log("Erro: ", error);
		// }
		console.log(input)
		return {
			id: 1, error: false}
	}
};
