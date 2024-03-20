import { Modal } from "react-native";
import { LinkCancel } from "../Links/Style";
import { BtnModal, ModalContent, PatientModal } from "../CancelModal/Style";
import { ButtonTxt } from "../EntryButton/Style";
import { ContentTxt, PatientImg, PatientName, ProfileData } from "./Style";

const MedRecordModal = ({
    visible, setShowModalAppointment, ...rest
}) => {
    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">

            <PatientModal>
                <ModalContent>
                    <PatientImg source={require("../../assets/img/chewie.jpg")} />

                    <PatientName> Chewie </PatientName>

                    <ProfileData>
                        <ContentTxt>6 anos</ContentTxt>
                        <ContentTxt>chewie@email.com</ContentTxt>
                    </ProfileData>

                    <BtnModal>
                        <ButtonTxt> Inserir prontuário </ButtonTxt>
                    </BtnModal>

                    <LinkCancel onPress={() => setShowModalAppointment(false)}>
                        Cancelar
                    </LinkCancel>
                </ModalContent>
            </PatientModal>

        </Modal>
    );
}

export default MedRecordModal;