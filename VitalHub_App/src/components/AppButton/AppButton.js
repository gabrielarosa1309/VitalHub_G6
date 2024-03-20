import { ButtonAppointment, ButtonAppointmentTxt } from "./Style";

export const AppButton = ({
    textButton,
    clickButton = false,
    onPress,
}) => {
    return (
        <ButtonAppointment clickButton={clickButton} onPress={onPress}>
            <ButtonAppointmentTxt clickButton={clickButton}> {textButton} </ButtonAppointmentTxt>
        </ButtonAppointment>
    )
}