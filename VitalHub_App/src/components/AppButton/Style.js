import styled, { css } from "styled-components";
import { ButtonHome, ButtonHomeTxt, ButtonRowHome } from "../HomeButton/Style";

export const ButtonRowAppointment = styled(ButtonRowHome)`
    margin-bottom: 0px;
    width: 100%;
`
export const ButtonAppointment = styled(ButtonHome)`
    ${props => props.clickButton ? css`
        background-color: #60BFC5;
    `: css`
        background-color: transparent;
        border: 2px solid #60BFC5;
    `}
`
export const ButtonAppointmentTxt = styled(ButtonHomeTxt)`
    ${props => props.clickButton ? css`
        color: #FBFBFB;
    `: css`
        color: #34898F;
    `}
`