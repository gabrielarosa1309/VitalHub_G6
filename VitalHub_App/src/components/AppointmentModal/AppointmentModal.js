import React, { useState } from 'react';
import { Modal } from "react-native";
import { BtnModal } from "../CancelModal/Style";
import { LinkCancel } from "../Links/Style";
import { Title, TitleInput } from "../Title/Style";
import { AppModal, ModalContent, SelectBox } from "./Style";
import { ButtonTxt } from "../EntryButton/Style";
import { ButtonRowAppointment } from "../AppButton/Style";
import { AppButton } from "../AppButton/AppButton";
import AppResumeModal from "../AppResumeModal/AppResumeModal";
import { InputInsert } from "../Input/Style";

const nivelConsulta = [
    { id: 'DE4D56BE-F647-4127-8962-3BA1C2D6577C', tipo: "Rotina" },
    { id: 'B070C6E9-E612-4774-8F30-C265DD15E1F3', tipo: "Exame" },
    { id: '4DDDDD07-4EBF-4ABA-AA1B-0A44E927584D', tipo: "Urgência" },
]

const AppointmentModal = ({
    navigation, visible, setShowModalApp, ...rest
}) => {
    const [showAppResume, setShowAppResume] = useState(false);
    const [agendamento, setAgendamento] = useState(null)

    const handleSubmit = () => {
        setShowModalApp(false);
        navigation.replace("SelectClinic", { agendamento: agendamento })
    };

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <AppModal>
                <ModalContent>
                    <Title> Agendar consulta </Title>

                    <SelectBox>
                        <TitleInput> Qual é o nível da consulta? </TitleInput>
                        <ButtonRowAppointment>
                            {nivelConsulta.map((item, index) => {
                                return (
                                    <AppButton
                                        key={item.id}

                                        onPress={() => setAgendamento({
                                            ...agendamento,
                                            prioridadeId: item.id,
                                            prioridadeLabel: item.tipo
                                        })}

                                        clickButton={
                                            agendamento
                                                ? agendamento.prioridadeId == item.id
                                                : false
                                        }

                                        textButton={item.tipo}
                                    />
                                )
                            })}
                        </ButtonRowAppointment>
                    </SelectBox>

                    <SelectBox>
                        <TitleInput> Qual é a localização desejada? </TitleInput>
                        <InputInsert
                            placeholder="Informe a localização"
                            value={agendamento ? agendamento.localizacao : null}
                            onChangeText={(txt) => setAgendamento({
                                ...agendamento,
                                localizacao: txt
                            })}
                        />
                    </SelectBox>

                    <AppResumeModal
                        visible={showAppResume}
                        setShowAppResume={setShowAppResume}
                        navigation={navigation}
                    />

                    <BtnModal onPress={handleSubmit}>
                        <ButtonTxt> Continuar </ButtonTxt>
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
