import styled from "styled-components"
import { Button } from "../EntryButton/Style"

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
    gap: 30px;
`
export const BtnModalStatus = styled(Button)`
    margin-top: 0px;
`