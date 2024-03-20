import { Modal } from "react-native";
import { BtnModal } from "../CancelModal/Style";
import { ButtonTxt } from "../EntryButton/Style";
import { Title } from "../Title/Style";
import { AppModal, BtnModalStatus, ModalContent } from "./Style";
import { Octicons } from '@expo/vector-icons';

const AppStatusModal = ({
    navigation, visible, setShowAppStatus, setShowAppResume, setShowAppModal, ...rest
}) => {
    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">

            <AppModal>
                <ModalContent>
                    <Title> Consulta agendada! </Title>

                    <Octicons
                        name="check-circle-fill"
                        size={62}
                        color="#52de60"
                    />

                    <BtnModalStatus onPress={() => navigation.replace("Main")}>
                        <ButtonTxt> Voltar para Home </ButtonTxt>
                    </BtnModalStatus>
                </ModalContent>
            </AppModal>

        </Modal>
    );
}

export default AppStatusModal;