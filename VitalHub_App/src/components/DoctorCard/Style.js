import styled from "styled-components";
import { Title } from "../Title/Style";

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
export const ImgColumn = styled.View`
    width: 30%;
    align-items: center;
    justify-content: center;
`
export const DoctorImg = styled.Image`
    width: 80px;
    height: 80px;
`
export const DataDoctorCard = styled.View`
    justify-content: center;
    width: 70%;
`
export const DoctorName = styled(Title)`   
    font-size: 20px;
`
export const DoctorSpecialty = styled.Text`
    font-size: 16px;
    font-family: "Quicksand_400Regular";
`