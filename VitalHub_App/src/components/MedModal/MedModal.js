import { Modal } from "react-native";
import { BtnModal, ModalContent, PatientModal } from "../CancelModal/Style";
import { ContentTxt, PatientImg, PatientName } from "../MedRecordModal/Style";
import { ProfileData } from "../PatientAppCard/Style";
import { ButtonTxt } from "../EntryButton/Style";
import { LinkCancel } from "../Links/Style";
import { useEffect, useState } from "react";

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
    const [nome, setNome] = useState()
    const [crm, setCrm] = useState()
    const [confirm, setConfirm] = useState(false)

    async function dataMedico() {
        setNome(consulta.medicoClinica.medico.idNavigation.nome)
        setCrm(consulta.medicoClinica.medico.crm)
    }

    async function handleClose(screen) {
        await setShowMedModal(false)

        if (screen == "Location") {
            navigation.replace(screen, { clinicaid: consulta.medicoClinica.clinicaId })
        } else {
            navigation.replace(screen)
        }
    }

    useEffect(() => {
        if (consulta) {
            dataMedico();
            setConfirm(true)
        }
    }, [consulta])

    return (
        <>
            {confirm ? (
                <Modal {...rest} visible={visible} transparent={true} animationType="fade">

                    <PatientModal>
                        <ModalContent>
                            <PatientImg source={require("../../assets/img/medico4.jpg")} />

                            <PatientName> {nome} </PatientName>

                            <ProfileData>
                                <ContentTxt> {crm} </ContentTxt>
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
            ) : (null)}
        </>
    );
}

export default MedModal;