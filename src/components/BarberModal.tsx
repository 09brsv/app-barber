import { TBarberModalComponent, TListDays } from "@mb/@types/barber";
import { ExpandIcon, NavNextIcon, NavPrevIcon } from "@mb/assets";
import { BarberService } from "@mb/service/barbers";
import { formatCurrencyBR } from "@mb/utils";
import dayjs from "dayjs";
import { SetStateAction, useEffect, useState } from "react";
import { Alert, FlatList, ListRenderItemInfo } from "react-native";
import styled from "styled-components/native";
import calendar from "../assets/data/calendar.data.json";

const Modal = styled.Modal``;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const ModalItem = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 15px;
`;

const UserName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
`;

const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  `;

const ServicePrice = styled(ServiceName)``;

const FinishButton = styled.TouchableOpacity`
  background-color: #268596;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const FinishButtonText = styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
`;

const DateInfo = styled.View`
  flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`;

const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`;

const DateTitle = styled.Text`
  color: #000000;
  font-size: 17px;
  font-weight: bold;
`;

const DateList = styled(FlatList<TListDays>)``;

const DateItem = styled.TouchableOpacity`
  width: 45px;
  border-radius: 10px;
  padding: 5px 0;
  justify-content: center;
	align-items: center;
`;

const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const DatePrevAreaText = styled.TouchableOpacity`
 flex: 1;
  align-items: flex-start;
`;

const TimeList = styled(FlatList<string>)``;

const TimeItem = styled.TouchableOpacity`
	width: 75px;
	height: 40px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
`;

const TimeItemText = styled.Text`
	font-size: 16px;
`;

const styleColorSelected = (param: number | string, date: number | string | null) => {
	const styleSelected = {
		color: "#ffffff",
		fontWeight: "bold",
	};
	const styleNotSelected = {
		color: "#000000",
	};
	return param === date ? styleSelected : styleNotSelected;
};

export const BarberModal = ({ show, setShow, user, serviceId, navigation }: TBarberModalComponent) => {
	const [selectedYear, setSelectedYear] = useState(0);
	const [selectedMonth, setSelectedMonth] = useState(0);
	const [selectedDay, setSelectedDay] = useState(0);
	const [selectedHour, setSelectedHour] = useState<string | null>(null);
	const [listDays, setListDays] = useState<TListDays[]>([]);
	const [listHours, setListHours] = useState<string[]>([]);

	const WIDTH = 42;

	let flatListRef: React.ElementRef<typeof FlatList<TListDays>> | null;

	const goIndex = () => {
		if (flatListRef) flatListRef.scrollToIndex({ animated: true, index: 0 });
	};

	const DateItemComponent = ({ item }: { item: TListDays }) => {
		return (
			<DateItem
				onPress={() => item.status && setSelectedDay(item.number)}
				style={{
					opacity: item.status ? 1 : 0.5,
					backgroundColor: item.number === selectedDay && item.status ? "#4eadbe" : "#ffffff",
				}}
			>
				<DateItemWeekDay style={item.status && styleColorSelected(item.number, selectedDay)}>
					{item.wekDay}
				</DateItemWeekDay>
				<DateItemNumber style={item.status && styleColorSelected(item.number, selectedDay)}>
					{item.number}
				</DateItemNumber>
			</DateItem>
		);
	};

	const TimeItemComponent = ({ item }: { item: string }) => (
		<TimeItem
			onPress={() => {
				if (dayjs().format("DD") === String(selectedDay)) {
					if (dayjs().isAfter(dayjs().format("HH:mm"), "minute")) {
						return;
					}
				}
				setSelectedHour(item);
			}}
			style={{
				opacity: item === selectedHour ? 1 : 0.5,
				backgroundColor: item === selectedHour ? "#4eadbe" : "#ffffff",
			}}
		>
			<TimeItemText style={styleColorSelected(item, selectedHour)}>{item}</TimeItemText>
		</TimeItem>
	);

	useEffect(() => {
		if (user.available) {
			const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
			const newListDays: SetStateAction<TListDays[]> = [];

			for (let i = 1; i <= daysInMonth; i++) {
				const date = new Date(selectedYear, selectedMonth, i);

				const availability = user.available.filter(item => item.date === dayjs(date).format("YYYY-MM-DD"));

				newListDays.push({
					status: availability.length ? true : false,
					wekDay: calendar.days[date.getDay()],
					number: i,
				});
			}
			setListDays(newListDays);
		}
	}, [selectedMonth, selectedYear, user]);

	useEffect(() => {
		const today = new Date();
		setSelectedYear(today.getFullYear());
		setSelectedMonth(today.getMonth());
		setSelectedDay(today.getDate());
	}, []);

	useEffect(() => {
		if (user?.available && selectedDay) {
			const date = new Date(selectedYear, selectedMonth, selectedDay);

			const availability = user.available.filter(item => item.date === dayjs(date).format("YYYY-MM-DD"));

			if (availability.length) {
				setListHours(availability[0].hours);
			}
		}
		setSelectedHour(null);
	}, [selectedDay, user, selectedMonth, selectedYear]);

	const renderItem = ({ item }: ListRenderItemInfo<TListDays>) => <DateItemComponent item={item} />;

	const renderItemTime = ({ item }: ListRenderItemInfo<string>) => <TimeItemComponent item={item} />;

	const updateDate = (operator: "left" | "right") => {
		const mountDate = new Date(selectedYear, selectedMonth, 1);
		mountDate.setMonth(operator === "left" ? selectedMonth - 1 : selectedMonth + 1);
		setSelectedYear(mountDate.getFullYear());
		setSelectedMonth(mountDate.getMonth());
		setSelectedDay(0);
		goIndex();
	};

	const handleCloseButton = () => {
		setShow(false);
	};

	const handleFinishClick = async () => {
		if (user.id && (serviceId || serviceId === 0) && selectedDay && selectedHour) {
			const res = await BarberService.setAppointment({
				barberId: user.barberId ?? user.id,
				serviceId,
				day: selectedDay,
				time: selectedHour,
			});

			if (res.error) {
				Alert.alert(String(res.error));
			} else {
				setShow(false);
				navigation.navigate("Appointments");
			}
		} else {
			Alert.alert("Selecione uma data e um horário");
		}
	};

	return (
		<Modal transparent={true} visible={show} animationType="slide">
			<ModalArea>
				<ModalBody>
					<CloseButton onPress={handleCloseButton}>
						<ExpandIcon width="40" height="40" fill="#000000" />
					</CloseButton>

					<ModalItem>
						<UserInfo>
							<UserAvatar source={{ uri: user.avatar }} />

							<UserName>{user.name}</UserName>
						</UserInfo>
					</ModalItem>

					<ModalItem>
						<ServiceInfo>
							<ServiceName>{user.services[serviceId].name}</ServiceName>
							<ServicePrice>{formatCurrencyBR(user.services[serviceId].price)}</ServicePrice>
						</ServiceInfo>
					</ModalItem>

					<ModalItem>
						<DateInfo>
							<DatePrevArea onPress={() => updateDate("left")}>
								<NavPrevIcon width="35" height="35" fill="#000000" />
							</DatePrevArea>
							<DateTitleArea>
								<DateTitle>
									{calendar.months[selectedMonth]} {selectedYear}
								</DateTitle>
							</DateTitleArea>
							<DateNextArea onPress={() => updateDate("right")}>
								<NavNextIcon width="35" height="35" fill="#000000" />
							</DateNextArea>
						</DateInfo>
						<DateList
							horizontal
							showsHorizontalScrollIndicator={false}
							data={listDays}
							getItemLayout={(_, index) => ({ length: WIDTH, offset: WIDTH * index, index })}
							initialScrollIndex={
								dayjs().format("MM/YYYY") ===
								dayjs(new Date(selectedYear, selectedMonth)).format("MM/YYYY")
									? selectedDay
									: 0
							}
							renderItem={renderItem}
							ref={ref => {
								flatListRef = ref;
							}}
						/>
					</ModalItem>

					{selectedDay > 0 && listHours.length > 0 && (
						<ModalItem>
							<TimeList
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								data={listHours}
								renderItem={renderItemTime}
							/>
						</ModalItem>
					)}

					<FinishButton onPress={handleFinishClick}>
						<FinishButtonText>Finalizar Agendamento</FinishButtonText>
					</FinishButton>
				</ModalBody>
			</ModalArea>
		</Modal>
	);
};
