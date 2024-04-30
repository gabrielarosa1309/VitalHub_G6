import styled, { css } from "styled-components";

export const Button = styled.TouchableOpacity`
    width: 90%;
    height: 50px;
    border-radius: 10px;
    margin: 15px 0px;
    background-color: #496BBA;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`
export const ButtonReset = styled(Button)`
    margin-top: 30px;
`
export const ButtonTxt = styled.Text`
    color: white;
    font-size: 16px;
    font-family: "MontserratAlternates_700Bold";
    text-transform: uppercase;
`
export const RowButtonVisu = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: space-evenly;
`
export const ButtonVisu = styled(Button)`
    width: 90%;
    background-color: #49B3BA;
    flex-direction: row;
    gap: 5px;
    margin-top: 0px;
`
export const ButtonVisuTxt = styled(ButtonTxt)`
    text-transform: none;
`
export const ExitButton = styled(Button)`
    width: 60%;
    background-color: #ACABB7;
`

export const ButtonCamera = styled.TouchableOpacity.attrs({
    activeOpacity : 0.8
})`
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #FBFBFB;
    background-color: #496DBA;
    bottom: -20px;
    right: 15px;
    position: absolute;
`
export const ContainerImage = styled.View`
    width: 100%;
    height: 280px;
    margin-bottom: 20px;
    position: relative;
    align-items: center;
    justify-content: flex-start;
`

export const ButtonInsert = styled(Button)`
    width: 100%;
`