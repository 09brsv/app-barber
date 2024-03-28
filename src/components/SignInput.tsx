import styled from "styled-components/native";

const InputArea = styled.View`
	width: 100%;
	height: 60px;
	background-color: #83d6e3;
	border-radius: 30px;
	flex-direction: row;
	align-items: center;
	padding-left: 15px;
	margin-bottom: 15px;
`;

const Input = styled.TextInput`
	flex: 1;
	font-size: 16px;
	color: #268596;
	margin-left: 10px;
`;

export const SignInput =  ({
	IconSvg,
	placeholder,
	value,
	onChange,
	password
}: {
	IconSvg: React.SVGFactory;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
	password?: boolean;
}) => {
	return (
		<InputArea>
			<IconSvg width="24" height="24" />
			<Input
				placeholder={placeholder}
				placeholderTextColor="#268596"
				value={value}
				onChangeText={onChange}
				secureTextEntry={password}
			/>
		</InputArea>
	);
};
