import styled from "styled-components/native";


export const Container = styled.SafeAreaView`
 flex: 1;
 background-color: #63C2D1;
`


export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`

export const HeaderArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  width: 250px;
`


export const SearchButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
`


export const LocationArea = styled.View`
  background-color: #4eadbe;
  height: 60px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
`


export const LocationInput = styled.TextInput`
  flex: 1;
  height: 60px;
  margin-left: 10px;
  color: #fff;
  font-size: 16px;
`


export const LocationFinder = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`

export const ListArea = styled.View`
  margin: 30px 0;
`