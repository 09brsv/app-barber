import { BarberScreenRouteProps, RootStackParamList } from "@mb/@types/navigators";
import { BackIcon, FavoriteFullIcon, FavoriteIcon, NavNextIcon, NavPrevIcon } from "@mb/assets";
import { BarberModal, Stars } from "@mb/components";
import { BarberService } from "@mb/service/barbers";
import { formatCurrencyBR } from "@mb/utils";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import Swiper from "react-native-swiper";
import {
	BackButton,
	Container,
	FakeSwiper,
	LoadingIcon,
	PageBody,
	Scroller,
	ServiceArea,
	ServiceChooseBtnText,
	ServiceChooseButton,
	ServiceInfo,
	ServiceItem,
	ServiceName,
	ServicePrice,
	ServicesTitle,
	SwipeDot,
	SwipeDotActive,
	SwipeImage,
	SwipeItem,
	TestimonialArea,
	TestimonialBody,
	TestimonialInfo,
	TestimonialItem,
	TestimonialName,
	UserAvatar,
	UserFavButton,
	UserInfo,
	UserInfoArea,
	UserInfoName,
} from "./styles";

export const Barber = ({
	navigation,
	route,
}: {
	navigation: NativeStackNavigationProp<RootStackParamList, "Barber">;
	route: BarberScreenRouteProps;
}) => {
	const barberParams = route.params;
	const [userInfo, setUserInfo] = useState<typeof barberParams>(barberParams);
	const [loading, setLoading] = useState(false);
	const [favorited, setFavorited] = useState(false);
	const [selectedService, setSelectedService] = useState<number | null>(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const getBarberInfo = () => {
			setLoading(true);
			BarberService.getBarber(barberParams.barberId ?? 0)
				.then(res => {
					setUserInfo(res.data);
					setFavorited(res.data.favorited);
				})
				.catch(err => {
					console.log(err);
					Alert.alert("Erro", "Erro ao buscar informações do barbeiro");
				})
				.finally(() => setLoading(false));
		};
		getBarberInfo();
	}, [barberParams.barberId]);

	const handleBackButton = (navigation: NativeStackNavigationProp<RootStackParamList>) => {
		navigation.goBack();
	};

	const handleFavClick = () => {
		setFavorited(!favorited);
	};

	const handleServiceChoose = (idx: number) => {
		setSelectedService(idx);
		setShowModal(true);
	};

	return (
		<Container>
			<Scroller>
				{userInfo.photos?.length ? (
					<Swiper
						style={{ height: 240 }}
						dot={<SwipeDot />}
						activeDot={<SwipeDotActive />}
						paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
						autoplay
					>
						{userInfo.photos?.map(item => (
							<SwipeItem key={item.id}>
								<SwipeImage source={{ uri: item.url }} resizeMode="cover" />
							</SwipeItem>
						))}
					</Swiper>
				) : (
					<FakeSwiper />
				)}
				<PageBody>
					<UserInfoArea>
						<UserAvatar source={{ uri: userInfo.avatar }} />

						<UserInfo>
							<UserInfoName>{userInfo.name}</UserInfoName>

							<Stars stars={userInfo.stars} showNumber />
						</UserInfo>

						<UserFavButton onPress={handleFavClick}>
							{favorited ? (
								<FavoriteFullIcon width="24" height="24" fill="#ff0000" />
							) : (
								<FavoriteIcon width="24" height="24" fill="#ff0000" />
							)}
						</UserFavButton>
					</UserInfoArea>

					{loading && <LoadingIcon size="large" color="#000000" />}

					{userInfo.services && (
						<ServiceArea>
							<ServicesTitle>Lista de serviços</ServicesTitle>

							{userInfo.services.map((item, i) => (
								<ServiceItem key={`${item.name}-${i.toString()}`}>
									<ServiceInfo>
										<ServiceName>{item.name}</ServiceName>

										<ServicePrice>{formatCurrencyBR(item.price)}</ServicePrice>
									</ServiceInfo>

									<ServiceChooseButton onPress={() => handleServiceChoose(i)}>
										<ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
									</ServiceChooseButton>
								</ServiceItem>
							))}
						</ServiceArea>
					)}

					{userInfo.testimonials?.length && (
						<TestimonialArea>
							<Swiper
								style={{ height: 110 }}
								showsButtons
								prevButton={<NavPrevIcon width="35" height="35" fill="#ffffff" />}
								nextButton={<NavNextIcon width="35" height="35" fill="#ffffff" />}
								showsPagination={false}
							>
								{userInfo.testimonials?.map((item, i) => (
									<TestimonialItem key={`${item.name}-${i.toString()}`}>
										<TestimonialInfo>
											<TestimonialName>{item.name}</TestimonialName>

											<Stars stars={item.rate} showNumber={false} />
										</TestimonialInfo>
										<TestimonialBody>{item.body}</TestimonialBody>
									</TestimonialItem>
								))}
							</Swiper>
						</TestimonialArea>
					)}
				</PageBody>
			</Scroller>
			<BackButton onPress={() => handleBackButton(navigation)}>
				<BackIcon width="44" height="44" fill="#ffffff" />
			</BackButton>
			{userInfo.services && (
				<BarberModal
					show={showModal}
					setShow={setShowModal}
					serviceId={selectedService ?? 0}
					user={userInfo}
					navigation={navigation}
				/>
			)}
		</Container>
	);
};
