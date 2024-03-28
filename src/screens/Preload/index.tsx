import { BarberLogo } from "@mb/assets";
import auth from "@mb/service/auth";
import { tokenStore, userStore } from "@mb/store/userStore";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Container, LoadingIcon } from "./styles";

export const Preload = ({
	navigation
}: {
	navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
	const _tokenStore = tokenStore();
	const { updateUser } = userStore();
	useEffect(() => {
		const checkToken = () => {
			auth
				.checkToken()
				.then(res => {
					if (res.token) {
						_tokenStore.setToken(res.token);
						updateUser(res.data);
						navigation.reset({
							routes: [{ name: "MainTab" }]
						});
					} else {
						navigation.navigate("SignIn");
					}
				})
				.catch(error => {
					navigation.navigate("SignIn");
					console.log("Error:", error);
				});
		};
		checkToken();
	}, []);

	return (
		<Container>
			<BarberLogo width="100%" height="160" />
			<LoadingIcon size="large" color="#ffffff" />
		</Container>
	);
};
