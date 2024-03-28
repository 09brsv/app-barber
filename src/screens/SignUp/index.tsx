import { BarberLogo, EmailIcon, LockIcon, PersonIcon } from "@mb/assets";
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

export const SignUp = ({
	navigation
}: {
	navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
	const [nameField, setNameField] = React.useState("");
	const [emailField, setEmailField] = React.useState("");
	const [passwordField, setPasswordField] = React.useState("");

	const _tokenStore = tokenStore();
	const handleMessageButton = () => {
		navigation.reset({
			routes: [{ name: "SignIn" as never }]
		});
	};

	const handleSignButton = () => {
		if (emailField === "" || passwordField === "" || nameField === "") {
			Alert.alert("Erro", "Preencha todos os campos!", [
				{
					text: "Ok",
					style: "cancel"
				}
			]);
		} else {
			auth
				.signUp({ email: emailField, password: passwordField, name: nameField })
				.then(res => {
					if (res.token) {
						_tokenStore.setToken(res.token);
					
						navigation.reset({
							routes: [{ name: "MainTab" }],
						})
					
					} else {
						Alert.alert("Erro", "Ocorreu um erro no cadastro!", [
							{ text: "Voltar", style: "cancel" }
						]);
						console.log(res.error);
					}
					return;
				});
		}
	};

	return (
		<Container>
			<BarberLogo width="100%" height="160" />

			<InputArea>
				<SignInput
					IconSvg={PersonIcon}
					placeholder="Digite seu nome"
					value={nameField}
					onChange={t => setNameField(t)}
				/>
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
					<CustomButtonText>CADASTRAR</CustomButtonText>
				</CustomButton>
			</InputArea>

			<SignMessageButton>
				<SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
				<SignMessageButtonTextBold onPress={handleMessageButton}>
					Entre
				</SignMessageButtonTextBold>
			</SignMessageButton>
		</Container>
	);
};
