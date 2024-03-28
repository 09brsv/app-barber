import auth from "@mb/service/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text } from "react-native";
import { Container } from "./styles";

export const Profile = ({
	navigation
}: {
	navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
	const handleLogout = () => {
		auth.logout().then(() => {
			AsyncStorage.removeItem("token");
			navigation.reset({
				routes: [{ name: "SignIn" }]
			});
		});
	};

	return (
		<Container>
			<Text>Profile</Text>
			<Button title="Sair" onPress={handleLogout} />
		</Container>
	);
};
