import styled from "styled-components";
import { ModalTxt } from "../CancelModal/Style";

export const AppModal = styled.View`
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
export const ModalTxtResume = styled(ModalTxt)`
    margin: 20px 0px;
    font-size: 18px;
`
export const ContainerInfoBox = styled.View`
    width: 90%;
    gap: 20px;
`
export const InfoBox = styled.View`
    
`
export const Content = styled.Text`
    font-size: 16px;
    font-family: "Quicksand_400Regular";
`
