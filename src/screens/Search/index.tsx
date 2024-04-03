import { TBarber } from "@mb/@types/barber";
import { SearchIcon } from "@mb/assets";
import { BarberItem } from "@mb/components";
import { Container, ListArea, Scroller } from "@mb/shared/styles";
import { useBarberStore } from "@mb/store";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HeaderArea, InputArea, SearchInput } from "./styles";

export const Search = ({navigation,
}: {
	navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
	const { barbersFiltered, setBarberFilter, resetBarberFilter } = useBarberStore();

	return (
		<Container>
			<Scroller>
				<HeaderArea>
					<InputArea>
            <SearchInput autoComplete="name" autoCapitalize="words" onChangeText={setBarberFilter} autoCorrect={false} placeholder="Qual barbeiro você procura?" autoFocus />
						<SearchIcon width="26" height="26" fill="#9eabb3" />
          </InputArea>
				</HeaderArea>
        {
          barbersFiltered[0] &&
          <ListArea>
            {barbersFiltered.map((item: TBarber) => (
              <BarberItem key={item.id} navigation={navigation} data={item} />
            ))}
          </ListArea>
        }
			</Scroller>
		</Container>
	);
};
