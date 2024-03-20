import styled from "styled-components";
import { Button } from "../EntryButton/Style";

export const PatientModal = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
`
export const ModalContent = styled.View`
    width: 90%;
    padding: 30px;
    border-radius: 10px;
    background-color: #fff;
    align-items: center;
`
export const ModalTxt = styled.Text`
    width: 270px;
    font-size: 16px;
    color: #5F5C6B;
    line-height: 22px;
    text-align: center;
    margin-top: 10px;
    font-family: "Quicksand_500Medium";
`
export const BtnModal = styled(Button)`
    margin-top: 30px;
`