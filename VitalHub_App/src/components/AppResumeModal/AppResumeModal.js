import { ActivityIndicator, Modal } from "react-native";
import { BtnModal } from "../CancelModal/Style";
import { ButtonTxt } from "../EntryButton/Style";
import { LinkCancel } from "../Links/Style";
import { Title, TitleInput } from "../Title/Style";
import { AppModal, ContainerInfoBox, Content, InfoBox, ModalContent, ModalTxtResume } from "./Style";
import { useEffect, useState } from "react";
import AppStatusModal from "../AppStatusModal/AppStatusModal";
import * as Notifications from "expo-notifications";
import moment from "moment";
import api from "../../Service/Service";
import { userDecodeToken } from "../../utils/Auth";

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
    const [profile, setProfile] = useState('');

    async function ProfileLoad() {
        const token = await userDecodeToken();

        if (token) {
            setProfile(token.user)
        }
    };

    useEffect(() => {
        ProfileLoad();
    }, [visible]);

    async function agendarConsulta() {
        await api
            .post('/Consultas/Cadastrar', {
                ...agendamento,
                pacienteId: profile,
                situacaoId: '3EF5B05E-17F4-4F54-9516-978DF709B7BA',
            })
            .then(async response => {
                console.log(response);
                navigation.replace('Main');
            })
            .catch((error) => {
                console.log(error);
                console.log(error.config);
                console.log(error.message);
            });
    }

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
                body: "A consulta foi agendada com sucesso."
            },
            trigger: null
        });
    }

    function handleContinue() {
        agendarConsulta();
        handleCallNotifications()
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <AppModal>
                {agendamento != null ? (
                    <ModalContent>
                        <Title> Agendar consulta </Title>

                        <ModalTxtResume> Consulte os dados selecionados para a sua consulta </ModalTxtResume>

                        <ContainerInfoBox>
                            <InfoBox>
                                <TitleInput> Data da consulta </TitleInput>
                                <Content> {moment(
									agendamento.dataConsulta,
								).format(
									'DD/MM/YYYY HH:mm',
								)} </Content>
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
                        />

                        <BtnModal onPress={() => handleContinue()}>
                            <ButtonTxt> Confirmar </ButtonTxt>
                        </BtnModal>

                        <LinkCancel onPress={() => setShowAppResume(false)}>
                            Cancelar
                        </LinkCancel>
                    </ModalContent>
                ) : (
                    <ActivityIndicator/>
                )}
            </AppModal>
        </Modal>
    );
}

export default AppResumeModal;