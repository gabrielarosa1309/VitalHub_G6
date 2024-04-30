import { Modal } from "react-native";
import { BtnModal, ModalContent, PatientModal } from "../CancelModal/Style";
import { ContentTxt, PatientImg, PatientName } from "../MedRecordModal/Style";
import { ProfileData } from "../PatientAppCard/Style";
import { ButtonTxt } from "../EntryButton/Style";
import { LinkCancel } from "../Links/Style";

const MedModal = ({
    navigation, 
    visible, 
    setShowMedModal,
    roleUsuario,
    dataConsulta,
    prioridade,
    usuarioConsulta,
    situacao, 
    consulta,
    ...rest
}) => {
    async function handleClose(screen) {
        console.log(consulta)
        await setShowMedModal(false)
        
        if (screen == "Location") {
          navigation.replace(screen, { clinicaid: consulta.medicoClinica.clinicaId })
        } else {
          navigation.replace(screen)
        }
      }
    
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

                    <BtnModal onPress={() => handleClose("Location")}>
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