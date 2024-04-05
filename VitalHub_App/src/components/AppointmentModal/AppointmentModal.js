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
import { Text } from "react-native";

const AppointmentModal = ({
    navigation, visible, setShowModalApp, ...rest
}) => {
    const [statusLista, setStatusLista] = useState("exame");
    const [showAppResume, setShowAppResume] = useState(false);
    const [localizacao, setLocalizacao] = useState('');
    const [localizacaoError, setLocalizacaoError] = useState('');

    async function handleClose(screen) {
        await setShowModalApp(false)
        navigation.replace(screen)
    }

    const validateLocalizacao = () => {
        if (!localizacao) {
            setLocalizacaoError('Localização é obrigatória');
            return false;
        }
        setLocalizacaoError('');
        return true;
    };

    const handleSubmit = () => {
        if (validateLocalizacao()) {
            handleClose("SelectClinic");
        }
    };

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
                        <InputInsert
                            placeholder="Digite a localização"
                            value={localizacao}
                            onChangeText={(txt) => setLocalizacao(txt)}
                            style={localizacaoError ? { borderColor: 'red' } : {}}
                        />
                        {localizacaoError && <Text style={{ color: 'red' }}>{localizacaoError}</Text>}
                    </SelectBox>

                    <AppResumeModal
                        visible={showAppResume}
                        setShowAppResume={setShowAppResume}
                        navigation={navigation}
                    />

                    <BtnModal onPress={handleSubmit}>
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
