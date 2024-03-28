import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TUser = {
	avatar: string;
	favorites: [];
	appointments: [];
};
type TToken = {
	token: string;
};

type TStateUser = {
	user: TUser | null;
	setAvatar: (avatar: string) => void;
	removeUser: () => void;
	updateUser: (user: TUser) => void;
};

type TStateToken = {
	token: TToken | null;
	setToken: (token: TToken) => void;
	removeToken: () => void;
};

const initialState: TUser = {
	avatar: "",
	favorites: [],
	appointments: []
};

export const userStore = create<TStateUser>((set, get) => ({
	user: initialState,
	setAvatar: avatar =>
		set(state => ({ user: { ...(state.user ?? initialState), avatar } })),
	removeUser: () => set(() => ({ user: null })),
	updateUser: user => set(() => ({ user }))
}));

export const tokenStore = create<TStateToken>()(
	persist(
		set => ({
			token: null,
			setToken: token => set(() => ({ token })),
			removeToken: () => set(() => ({ token: null }))
		}),
		{
			name: "token",
			storage: createJSONStorage(() => AsyncStorage)
		}
	)
);
