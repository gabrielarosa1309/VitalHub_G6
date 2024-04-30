import { Modal } from "react-native";
import { BtnModal } from "../CancelModal/Style";
import { ButtonTxt } from "../EntryButton/Style";
import { LinkCancel } from "../Links/Style";
import { Title, TitleInput } from "../Title/Style";
import { AppModal, ContainerInfoBox, Content, InfoBox, ModalContent, ModalTxtResume } from "./Style";
import { useState } from "react";
import AppStatusModal from "../AppStatusModal/AppStatusModal";
import * as Notifications from "expo-notifications";
import moment from "moment";

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
    navigation, visible, setShowAppResume, agendamento, route, ...rest
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

    const handlePress = ({agendamento, navigation, route}) => {
        setShowAppStatus(true);
        handleCallNotifications();
       };

    async function ConfirmarConsulta() {
        await api.post("/Consultas/Cadastrar", {
            ... agendamento,
            pacienteId : profile.user,
            situacaoId : '3EF5B05E-17F4-4F54-9516-978DF709B7BA'
        }).then(async response => {
            await setShowAppResume(false);
            navigation.replace("Main");
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">


            <AppModal>
                <ModalContent>
                    {/* <Title> Agendar consulta </Title>

                    <ModalTxtResume> Consulte os dados selecionados para a sua consulta </ModalTxtResume>

                    <ContainerInfoBox>
                        <InfoBox>
                            <TitleInput> Data da consulta </TitleInput>
                            <Content> {moment(agendamento.dataConsulta).format("DD/MM/YYYY")} </Content>
                        </InfoBox>

                        <InfoBox>
                            <TitleInput> Médico(a) da consulta </TitleInput>
                            <Content> {agendamento.medicoLabel} </Content>
                            <Content> {agendamento.clinicaLabel} </Content>
                        </InfoBox>

                        <InfoBox>
                            <TitleInput> Local da consulta </TitleInput>
                            <Content> {agendamento.localizacao} </Content>
                        </InfoBox>

                        <InfoBox>
                            <TitleInput> Tipo de consulta </TitleInput>
                            <Content> {agendamento.prioridadeLabel} </Content>
                        </InfoBox>
                    </ContainerInfoBox>

                    <AppStatusModal
                        visible={showAppStatus}
                        setShowAppStatus={setShowAppStatus}
                        navigation={navigation}
                    /> */}

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