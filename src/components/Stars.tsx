import { StarEmptyIcon, StarFullIcon, StarHalfIcon } from "@mb/assets";
import styled from "styled-components/native";

const StarArea = styled.View`
	flex-direction: row;
`;

const StarView = styled.View``;

const StarText = styled.Text`
	font-size: 12px;
	font-weight: bold;
	margin-left: 5px;
	color: #737373;
`;

export const Stars = ({
	stars,
	showNumber
}: {
	stars: number;
	showNumber: boolean;
}) => {
	const starsValue = Array.from({ length: 5 }, () => 0);

	for (const [idx] of starsValue.entries()) {
		const starIndice = idx + 1;
		if (stars > starIndice) {
			starsValue[idx] = 2;
		} else if (stars >= starIndice - 0.5) {
			starsValue[idx] = 1;
		} else {
			starsValue[idx] = 0;
		}
	}

	return (
		<StarArea>
			{starsValue.map((i, index) => (
				<StarView key={index}>
					{i === 0 && (
						<StarEmptyIcon width="18px" height="18px" fill="#ff9200" />
					)}
					{i === 1 && (
						<StarHalfIcon width="18px" height="18px" fill="#ff9200" />
					)}
					{i === 2 && (
						<StarFullIcon width="18px" height="18px" fill="#ff9200" />
					)}
				</StarView>
			))}
			{showNumber && <StarText>{stars}</StarText>}
		</StarArea>
	);
};
