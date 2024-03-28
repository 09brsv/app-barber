import { RootStackParamList } from "@mb/@types/navigators";
import { Barber, Preload, SignIn, SignUp } from "@mb/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainTab } from "./MainTab";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStack = () => {
	return (
		<Stack.Navigator
		initialRouteName="Preload"
		screenOptions={{
			headerShown: false,
		}}
		>
			<Stack.Screen name="Preload" component={Preload} />
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="SignUp" component={SignUp} />
			<Stack.Screen name="MainTab" component={MainTab} />
			<Stack.Screen name="Barber" component={Barber} />
		</Stack.Navigator>
	);
};
