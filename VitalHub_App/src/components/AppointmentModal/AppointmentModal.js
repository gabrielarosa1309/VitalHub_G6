import { Modal } from "react-native";
import { BtnModal } from "../CancelModal/Style";
import { LinkCancel } from "../Links/Style";
import { Title, TitleInput } from "../Title/Style";
import { AppModal, ModalContent, SelectBox } from "./Style";
import { ButtonTxt } from "../EntryButton/Style";
import { useState } from "react";
import { ButtonRowAppointment } from "../AppButton/Style";
import { AppButton } from "../AppButton/AppButton";
import AppResumeModal from "../AppResumeModal/AppResumeModal";
import {InputInsert } from "../Input/Style";

const AppointmentModal = ({
    navigation, visible, setShowModalApp, ...rest
}) => {
    const [statusLista, setStatusLista] = useState("exame");
    const [showAppResume, setShowAppResume] = useState(false);

    async function handleClose( screen ) {
        await setShowModalApp(false)
        navigation.replace(screen)
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">

            <AppModal>
                <ModalContent>
                    <Title> Agendar consulta </Title>

                    <SelectBox>
                        <TitleInput> Qual é o nível da consulta? </TitleInput>
                        <ButtonRowAppointment>
                            <AppButton
                                textButton={"Exame"}
                                clickButton={statusLista === "exame"}
                                onPress={() => setStatusLista("exame")}
                            />

                            <AppButton
                                textButton={"Rotina"}
                                clickButton={statusLista === "rotina"}
                                onPress={() => setStatusLista("rotina")}
                            />


                            <AppButton
                                textButton={"Urgência"}
                                clickButton={statusLista === "urgencia"}
                                onPress={() => setStatusLista("urgencia")}
                            />
                        </ButtonRowAppointment>
                    </SelectBox>

                    <SelectBox>
                        <TitleInput> Informe a localização </TitleInput>
                        <InputInsert placeholder="Digite a localização" />
                    </SelectBox>

                    <AppResumeModal
                        visible={showAppResume}
                        setShowAppResume={setShowAppResume}
                        navigation={navigation}
                    />

                    <BtnModal onPress={() => handleClose("SelectClinic")}>
                        <ButtonTxt> Confirmar </ButtonTxt>
                    </BtnModal>

                    <LinkCancel onPress={() => setShowModalApp(false)}>
                        Cancelar
                    </LinkCancel>
                </ModalContent>
            </AppModal>

        </Modal>
    );
}

export default AppointmentModal;