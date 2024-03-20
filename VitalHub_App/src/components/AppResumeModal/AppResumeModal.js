import { Modal } from "react-native";
import { BtnModal } from "../CancelModal/Style";
import { ButtonTxt } from "../EntryButton/Style";
import { LinkCancel } from "../Links/Style";
import { Title, TitleInput } from "../Title/Style";
import { AppModal, ContainerInfoBox, Content, InfoBox, ModalContent, ModalTxtResume } from "./Style";
import { useState } from "react";
import AppStatusModal from "../AppStatusModal/AppStatusModal";
import * as Notifications from "expo-notifications";

//Solicitar as permissoes de notificacoes 
Notifications.requestPermissionsAsync();

//definir como as notificacoes devem ser tratadas quando recebidas 
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true
    })
});

const AppResumeModal = ({
    navigation, visible, setShowAppResume, ...rest
}) => {
    const [showAppStatus, setShowAppStatus] = useState(false);

    //funcao pra lidar com chamada da notificacao
    const handleCallNotifications = async () => {

        //obtem o status das permissoes 
        const { status } = await Notifications.getPermissionsAsync()

        //verifica se o usuario concedeu permissao pra notificacao 
        if (status !== "granted") {
            alert("voce nao deixou as notificacoes ativas")
            return;
        }

        //agendar uma notificacao pra ser exibida apos 5 segundos
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta agendada",
                body: "A consulta do tipo Rotina com o Dr. Claudio no dia 26/09/2089 as 14:00 foi agendada com sucesso."
            },
            trigger: null
        });
    }

    const handlePress = () => {
        setShowAppStatus(true);
        handleCallNotifications();
       };

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">

            <AppModal>
                <ModalContent>
                    <Title> Agendar consulta </Title>

                    <ModalTxtResume> Consulte os dados selecionados para a sua consulta </ModalTxtResume>

                    <ContainerInfoBox>
                        <InfoBox>
                            <TitleInput> Data da consulta </TitleInput>
                            <Content> 1 de Novembro de 2024 </Content>
                        </InfoBox>

                        <InfoBox>
                            <TitleInput> Médico(a) da consulta </TitleInput>
                            <Content> Dra Alessandra </Content>
                            <Content> Demartóloga, Esteticista </Content>
                        </InfoBox>

                        <InfoBox>
                            <TitleInput> Local da consulta </TitleInput>
                            <Content> São Paulo, SP </Content>
                        </InfoBox>

                        <InfoBox>
                            <TitleInput> Tipo de consulta </TitleInput>
                            <Content> Rotina </Content>
                        </InfoBox>
                    </ContainerInfoBox>

                    <AppStatusModal
                        visible={showAppStatus}
                        setShowAppStatus={setShowAppStatus}
                        navigation={navigation}
                    />

                    <BtnModal onPress={handlePress}>
                        <ButtonTxt> Confirmar </ButtonTxt>
                    </BtnModal>

                    <LinkCancel onPress={() => setShowAppResume(false)}>
                        Cancelar
                    </LinkCancel>
                </ModalContent>
            </AppModal>

        </Modal>
    );
}

export default AppResumeModal;