import styled from "styled-components";
import css from "styled-components";


export const Input = styled.TextInput.attrs({placeholderTextColor: '#34898f'})`
    width: 90%;
    height: 53px;
    padding: 16px;
    margin-top: 15px;
    border: 2px solid #49b3ba;
    color: #34898f;
    border-radius: 5px;
    font-size: 16px;
    font-family: "MontserratAlternates_600SemiBold";
`
export const InputVerify = styled(Input)`
    width: 18%;
    height: 70px;
    padding: 16px;
    font-family: "Quicksand_600SemiBold";
    font-size: 40px;
    text-align: center;
`
export const InputBoxVerify = styled.View`
    flex-direction: row;
    gap: 20px;
`
export const InputInsert = styled(Input)`
    width: 100%;
    margin: 0px;
   
`
export const BigInputInsert = styled(Input)`
    width: 100%;
    height: 120px;
    margin: 0px;
    background-color: #D9D9D9;
    
`
export const BoxInput = styled.View`
    width: 90%;
    height: auto;
    margin: 10px 0px;
    gap: 10px;
`
export const BoxInputMed = styled(BoxInput)`

    gap: 10px;
    height: auto;
    margin: 10px 0px;
    width: 100%;
  
`
export const DirectionRow = styled(BoxInput)`
    flex-direction: row;
    width: 90%;
    margin-bottom: 0px;
`
export const BoxInputRow = styled(BoxInput)`
    margin: 0px 0px 30px 0px;
    width: 50%;
`
export const InputBlock = styled.Text`
    height: auto;
    padding: 16px;
    background-color: #F5F3F3;
    border-radius: 5px;
    color: #33303E;
    font-family: "MontserratAlternates_500Medium";
    font-size: 16px;
`
export const InputBlockImg = styled.View`
    height: 111px;
    padding: 16px;
    background-color: #F5F3F3;
    border-radius: 5px;
    color: #33303E;
    font-family: "MontserratAlternates_500Medium";
    font-size: 16px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
`
export const InpBlockImgTxt = styled.Text`
    color: #33303E;
    font-family: "MontserratAlternates_500Medium";
    font-size: 16px;
`
export const InputBodyRow = styled(InputBlock)`
    width: 95%;
`
