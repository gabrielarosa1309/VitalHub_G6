// HomeHeader/Style.js
import styled from "styled-components";
import { LinearGradient } from 'expo-linear-gradient';

export const HomeHeader = styled.View`
  width:  100%;
  height: 175px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 160px;
`

export const BoxUser = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  gap: 10px;
  flex-direction: row;
  align-items: center;
`

export const TextHome = styled.Text`
  font-family: 'Quicksand_500Medium';
  font-size: 16px;
  color: #4E4B59;
`

export const UserIcon = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 5px;
`

export const TitleWhite = styled.Text`
  font-size: 20px;
  color: #FBFBFB;
  font-family: 'MontserratAlternates_600SemiBold';
  margin-bottom: 5px;
`

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#60BFC5', '#496BBA'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 }
})`

  width: 100%;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  `;