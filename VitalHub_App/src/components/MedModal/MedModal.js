import { Modal } from "react-native";
import { BtnModal, ModalContent, PatientModal } from "../CancelModal/Style";
import { ContentTxt, PatientImg, PatientName } from "../MedRecordModal/Style";
import { ProfileData } from "../PatientAppCard/Style";
import { ButtonTxt } from "../EntryButton/Style";
import { LinkCancel } from "../Links/Style";

const MedModal = ({
    navigation, visible, setShowMedModal, ...rest
}) => {
    
    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">

            <PatientModal>
                <ModalContent>
                    <PatientImg source={require("../../assets/img/medico4.jpg")} />

                    <PatientName> Dr. Claudio </PatientName>

                    <ProfileData>
                        <ContentTxt>Clínico geral</ContentTxt>
                        <ContentTxt>CRM-15286</ContentTxt>
                    </ProfileData>

                    <BtnModal onPress={() => navigation.navigate("Location")}>
                        <ButtonTxt> Ver local da consulta </ButtonTxt>
                    </BtnModal>

                    <LinkCancel onPress={() => setShowMedModal(false)}>
                        Cancelar
                    </LinkCancel>
                </ModalContent>
            </PatientModal>

        </Modal>
    );
}

export default MedModal;