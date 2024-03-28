import { RouteProp } from "@react-navigation/native";
import { TBarber } from "./barber";

type RootStackParamList = {
	Barber: TBarber;
	Preload: undefined;
	SignIn: undefined;
	SignUp: undefined;
	MainTab: undefined;
	Appointments: undefined;
};

type BarberScreenRouteProps = RouteProp<RootStackParamList, "Barber">;
