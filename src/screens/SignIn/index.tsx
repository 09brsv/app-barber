
import { BarberLogo, EmailIcon, LockIcon } from "@mb/assets";
import { SignInput } from "@mb/components";
import auth from "@mb/service/auth";
import { tokenStore } from "@mb/store/userStore";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Alert } from "react-native";
import {
    Container,
    CustomButton,
    CustomButtonText,
    InputArea,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from "./styles";

export const SignIn = ({
	navigation
}: {
	navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
	const [emailField, setEmailField] = React.useState("");
	const [passwordField, setPasswordField] = React.useState("");
	const _tokenStore = tokenStore();


	const handleMessageButton = () => {
		navigation.reset({
			routes: [{ name: "SignUp" as never }],
		})
	};

	const handleSignButton = () => {
		if (emailField === "" || passwordField === "") {
			Alert.alert("Preencha os campos!");
		} else {

			auth.signIn({ email: emailField, password: passwordField })
			.then(res => {
				if (res.token) {
					_tokenStore.setToken(res.token);
					
					navigation.reset({
						routes: [{ name: "MainTab" }],
					})
				} else {
					Alert.alert("Usuário ou senha inválidos!");
				}
			});
		}
	};

	return (
		<Container>
			<BarberLogo width="100%" height="160" />

			<InputArea>
				<SignInput
					IconSvg={EmailIcon}
					placeholder="Digite seu email"
					value={emailField}
					onChange={t => setEmailField(t)}
				/>
				<SignInput
					IconSvg={LockIcon}
					placeholder="Digite sua senha"
					value={passwordField}
					onChange={t => setPasswordField(t)}
					password={true}
				/>
				<CustomButton onPress={handleSignButton}>
					<CustomButtonText>LOGIN</CustomButtonText>
				</CustomButton>
			</InputArea>

			<SignMessageButton>
				<SignMessageButtonText>Não possui uma conta?</SignMessageButtonText>
				<SignMessageButtonTextBold onPress={handleMessageButton}>Cadastre-se</SignMessageButtonTextBold>
			</SignMessageButton>
		</Container>
	);
};
