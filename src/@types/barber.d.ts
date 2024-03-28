import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigators";

type TBarberModalComponent = {
	show: boolean;
	setShow: (param: boolean) => void;
	user: TBarber;
	serviceId: number;
	navigation: NativeStackNavigationProp<RootStackParamList, "Barber">;
};

type TBarber = {
	barberId?: number;
	id: number;
	avatar: string;
	name: string;
	stars: number;
	services: { name: string; price: number }[];
	photos?: { url: string; id: number }[];
	testimonials?: { body: string; name: string; rate: number }[];
	available?: { date: string; hours: string[] }[];
};

type TListDays = { status: boolean; wekDay: string; number: number };
