import { Modal } from "react-native"
import { ButtonTxt } from "../EntryButton/Style";
import { Title } from "../Title/Style";
import { LinkCancel } from "../Links/Style";
import { BtnModal, ModalContent, ModalTxt, PatientModal } from "./Style";
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

const CancelModal = ({
    onPressConfirm, visible, setShowModalCancel, ...rest
}) => {
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
                title: "Consulta cancelada",
                body: "Infelizmente a consulta do tipo Rotina com o Dr. Claudio no dia 26/09/2089 as 14:00 foi cancelada."
            },
            trigger: null
        });
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">

            <PatientModal>
                <ModalContent>
                    <Title> Cancelar consulta </Title>

                    <ModalTxt> Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário. Deseja mesmo cancelar essa consulta? </ModalTxt>

                    <BtnModal onPress={onPressConfirm}>
                        <ButtonTxt> Confirmar </ButtonTxt>
                    </BtnModal>

                    <LinkCancel onPress={() => setShowModalCancel(false)}>
                        Cancelar
                    </LinkCancel>
                </ModalContent>
            </PatientModal>

        </Modal>
    );
}

export default CancelModal;