import styled from "styled-components";

export const Title = styled.Text`
    font-size: 22px;
    color: #33303E;
    font-family: "MontserratAlternates_600SemiBold";
    margin-bottom: 5px;
`
export const Subtitle = styled.Text`
    font-size: 16px;
    color: #4E4B59;
    font-family: "Quicksand_500Medium";
    margin-bottom: 10px;
`
export const TitleInput = styled(Subtitle)`
    color: #33303E;
    font-family: "Quicksand_600SemiBold";
    align-self: flex-start;
    font-size: 17px;
`
export const TitleInputDate = styled(TitleInput)`
    width: 90%;
    margin: 30px 0px 0px 20px;
`

export const Title2 = styled(Title)`
    margin: 72px 0px 35px 0px;
    font-size: 24px;
`
export const CardTitle = styled(Title)`
    font-size: 18px;
`
export const TitleLocation = styled(Title)`
    margin-top: 40px;
`