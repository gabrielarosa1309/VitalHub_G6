import styled, { css } from "styled-components";
import { Title } from "../Title/Style";


export const ButtonCard = styled.TouchableOpacity`
margin-top: 10px;

`;

export const BoxSelectDoctorN = styled.View`
background-color: #FFFFFF;
height: 102px;
width: 90%;
border-radius: 5px;
box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);
align-items: center;
justify-content: center;
margin: 15px 0px 15px 0px;
${(props) =>
        props.clickButton === true && props.clinicId == props.index
            ? css`
          border: 2px solid #496BBA;
        `
            : css`
          border: none;
        `}
`;

export const AlignBoxSelectDoctorComponents = styled.View`
width: 90%;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 8px;
`



export const AlignSelectDoctorText = styled.View`
align-items: flex-start;
gap: 5px;
`

export const BoxSelectDoctorName = styled.Text`
color: #33303E;
font-size: 16px;
font-family: 'MontserratAlternates_600SemiBold';
`

export const BoxSelectDoctorType = styled.Text`
color: #8C8A97;
font-size: 14px;
font-family: 'Quicksand_500Medium';`


export const SelectDoctorImage = styled.Image`
width: 77px;
height: 80px;
border-radius: 5px;
align-self: center;
`

export const ContainerCardsList = styled.View`
    width: 90%;
    height: 12%;
    margin: 0 auto;
    margin-bottom:12px;
    padding: 10px 10px;
    align-items: center;
    border-radius: 5px;
    flex-direction: row;
    background-color:#fff;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);
    gap: 10px;
`
export const ContentCard = styled.View`
    width: 100%;
    flex-direction: row;
`
export const DataClinicCard = styled.View`
    width: 70%;
    gap: 2px;
`
export const ClinicName = styled(Title)`   
    font-size: 16px;
`
export const ClinicAddress = styled.Text`
    font-size: 16px;
    font-family: "Quicksand_600SemiBold";
`
export const IconsColumn = styled.View`
    width: 30%;
    align-items: center;
    justify-content: space-around;
`
export const ClockCard = styled.View`
    flex-direction: row;
    padding: 5px 8px;
    gap: 6px;
    border-radius: 5px;
    background-color: #E8FCFD;
    margin-top: 2px;
`
export const Rate = styled.View`
    flex-direction: row;
    align-items: center;
    align-self: flex-end;
    background-color: transparent;
`
export const TextBold = styled.Text`
    font-size: 15px;
    color: #49B3BA;
    font-family: "Quicksand_600SemiBold";
`
export const TextBoldRate = styled.Text`
    font-size: 15px;
    color: #F9A620;
    font-family: "Quicksand_600SemiBold";
`