import { TBarber } from "@mb/@types/barber";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { Stars } from ".";

const Area = styled.TouchableOpacity`
	background-color: #ffffff;
	margin-bottom: 20px;
	border-radius: 20px;
	padding: 15px;
	flex-direction: row;
`;

const Avatar = styled.Image`
	width: 88px;
	height: 88px;
	border-radius: 20px;
`;

const InfoArea = styled.View`
	margin-left: 20px;
	justify-content: space-between;
`;

const UserName = styled.Text`
	font-size: 17px;
	font-weight: bold;
`;

const SeeProfileButton = styled.View`
	width: 85px;
	height: 26px;
	border: 1px solid #4eadbe;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
`;

const SeeProfileButtonText = styled.Text`
	font-size: 13px;
	color: #268596;
`;

export const BarberItem = ({
	data,
	navigation
}: {
	data: TBarber;
	navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
	const handleClick = () => {
		navigation.navigate("Barber", {
			barberId: data.id,
			avatar: data.avatar,
			name: data.name,
			stars: data.stars
		});
	};

	return (
		<Area onPress={handleClick}>
			<Avatar source={{ uri: data.avatar }} />
			<InfoArea>
				<UserName>{data.name}</UserName>

				<Stars stars={data.stars} showNumber={true} />

				<SeeProfileButton>
					<SeeProfileButtonText>Ver perfil</SeeProfileButtonText>
				</SeeProfileButton>
			</InfoArea>
		</Area>
	);
};
