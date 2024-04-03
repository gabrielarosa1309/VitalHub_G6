import styled, { css } from "styled-components";



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
    props.clickButton === true && props.doctorId == props.index
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

export const BoxSelectDoctorType  = styled.Text`
color: #8C8A97;
font-size: 14px;
font-family: 'Quicksand_500Medium';`


export const SelectDoctorImage = styled.Image`
width: 77px;
height: 80px;
border-radius: 5px;
align-self: center;
`