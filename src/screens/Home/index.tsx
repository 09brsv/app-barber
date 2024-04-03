import { TBarber } from "@mb/@types/barber";
import { MyLocationIcon, SearchIcon } from "@mb/assets";
import { BarberItem } from "@mb/components";
import { BarberService } from "@mb/service/barbers";
import { ListArea, SearchButton } from "@mb/shared/styles";
import { useBarberStore } from "@mb/store";
import Geolocation from "@react-native-community/geolocation";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Platform, RefreshControl } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";
import { LoadingIcon } from "../Barber/styles";
import {
	Container,
	HeaderArea,
	HeaderTitle,
	LocationArea,
	LocationFinder,
	LocationInput,
	Scroller,
} from "./styles";

export const Home = ({
	navigation,
}: {
	navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
	const [locationText, setLocationText] = useState("");
	const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const { setBarbers, barbers } = useBarberStore();

	const handleLocationFinder = async () => {
		setCoordinates(null);
		const result = await request(
			Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
		);

		if (result === "granted") {
			setLoading(true);
			setLocationText("");
			setBarbers([]);
			Geolocation.getCurrentPosition(
				(info: unknown) => {
					if (info && typeof info === "object" && "coords" in info) {
						if (
							info.coords &&
							typeof info.coords === "object" &&
							"latitude" in info.coords &&
							"longitude" in info.coords
						) {
							const latitude = info.coords.latitude;
							const longitude = info.coords.longitude;
							if (
								latitude &&
								longitude &&
								typeof latitude === "number" &&
								typeof longitude === "number"
							) {
								setCoordinates({ latitude, longitude });
							}
						}
					}
					getBarbers();
				},
				(error: Error) => {
					console.log(error);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
			);
		}
	};

	useEffect(() => {
		getBarbers();
	}, []);

	const getBarbers = async () => {
		setLoading(true);
		let coords:
			| {
					lat?: number;
					lng?: number;
			  }
			| undefined;
		if (coordinates) {
			coords = {
				lat: coordinates.latitude,
				lng: coordinates.longitude,
			};
		}

		const res = await BarberService.getBarbers(coords, locationText);
		if (res?.data) {
			if (res.loc) {
				setLocationText(res.loc);
				setBarbers(res.data);
			}
		} else {
			setBarbers([
				{
					id: 1,
					name: "Barbeiro padrão",
					avatar: "https://avatars.githubusercontent.com/u/48898563?v=4",
					stars: 3.7,
					services: [
						{
							name: "Corte de Cabelo",
							price: 25,
						}
					]
				},
			]);
		}
		setLoading(false);
	};

	const onRefresh = () => {
		setRefreshing(false);
		getBarbers();
	};

	const handleLocationSearch = () => {
		setCoordinates(null);
		getBarbers();
	};

	return (
		<Container>
			<Scroller refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<HeaderArea>
					<HeaderTitle numberOfLines={2}>Encontre o seu/sua barbeiro(a) favorito(a)</HeaderTitle>
					<SearchButton onPress={() => navigation.navigate("Search")}>
						<SearchIcon width="26" height="26" fill="#ffffff" />
					</SearchButton>
				</HeaderArea>

				<LocationArea>
					<LocationInput
						placeholder="Onde você está?"
						placeholderTextColor="#ffffff"
						value={locationText}
						onChangeText={(e: string) => setLocationText(e)}
						onEndEditing={handleLocationSearch}
					/>
					<LocationFinder onPress={handleLocationFinder}>
						<MyLocationIcon width="24" height="24" fill="#ffffff" />
					</LocationFinder>
				</LocationArea>
				{loading && <LoadingIcon size="large" color="#ffffff" />}

				<ListArea>
					{barbers[0] &&
						barbers.map((item: TBarber) => (
							<BarberItem key={item.id} navigation={navigation} data={item} />
						))}
				</ListArea>
			</Scroller>
		</Container>
	);
};
