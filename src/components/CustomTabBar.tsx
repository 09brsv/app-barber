import {
  AccountIcon,
  FavoriteIcon,
  HomeIcon,
  SearchIcon,
  TodayIcon
} from "@mb/assets";
import { userStore } from "@mb/store/userStore";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import styled from "styled-components/native";

const TabArea = styled.View`
	height: 60px;
	background-color: #4eadbe;
	flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
	width: 70px;
	height: 70px;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	border-radius: 35px;
	border: 3px solid #4eadbe;
	margin-top: -20px;
`;

const AvatarIcon = styled.Image`
	width: 24px;
	height: 24px;
	border-radius: 12px;
	margin-bottom: 5px;
`;

export const CustomTabBar = (props: BottomTabBarProps) => {
	const { state, navigation } = props;
	const { user } = userStore();

	const goToScreen = (screenName: string) => {
		navigation.navigate(screenName);
	};

	const getActivedOpacity = (idx: number) => ({
		opacity: state.index === idx ? 1 : 0.5
	});

	return (
		<TabArea>
			<TabItem onPress={() => goToScreen("Home")}>
				<HomeIcon
					style={getActivedOpacity(0)}
					width="24"
					height="24"
					fill="#ffffff"
				/>
			</TabItem>
			<TabItem onPress={() => goToScreen("Search")}>
				<SearchIcon
					style={getActivedOpacity(1)}
					width="24"
					height="24"
					fill="#ffffff"
				/>
			</TabItem>
			<TabItemCenter onPress={() => goToScreen("Appointments")}>
				<TodayIcon width="32" height="32" fill="#4eadbe" />
			</TabItemCenter>
			<TabItem onPress={() => goToScreen("Favorites")}>
				<FavoriteIcon
					style={getActivedOpacity(3)}
					width="24"
					height="24"
					fill="#ffffff"
				/>
			</TabItem>
			<TabItem onPress={() => goToScreen("Profile")}>
				{user?.avatar ? (
					<AvatarIcon source={{ uri: user.avatar }} />
				) : (
					<AccountIcon
						style={getActivedOpacity(4)}
						width="24"
						height="24"
						fill="#ffffff"
					/>
				)}
			</TabItem>
		</TabArea>
	);
};
