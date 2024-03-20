import { FontAwesome } from "@expo/vector-icons"
import { AppointmentButtonBox } from "./Style";

export const AppointmentButton = ({onPress}) => {
    return (
        <AppointmentButtonBox onPress={onPress}>
            <FontAwesome
                name="stethoscope"
                size={32}
                color={'#FFFFFF'}
            />
        </AppointmentButtonBox>
    )
}

export default AppointmentButton;