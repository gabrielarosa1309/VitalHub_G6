import { View } from "react-native";
import { ContainerScroll, ContainerUser } from "../components/Container/Style";
import { ButtonVisu, ButtonVisuTxt, RowButtonVisu } from "../components/EntryButton/Style";
import { BoxInput, InpBlockImgTxt, InputBlock, InputBlockImg } from "../components/Input/Style";
import { LinkCancel, RedLinkCancel } from "../components/Links/Style";
import { ContentTxt } from "../components/MedRecordModal/Style";
import { ProfileData } from "../components/PatientAppCard/Style";
import { Title, TitleInput } from "../components/Title/Style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ImgProfile } from "../components/ImgProfile/Style";
import { useState } from "react";
import CameraModal from "../components/CameraModal/CameraModal";

export const PatientVisuRecord = ({ navigation }) => {
    const [uriCameraCapture, setUriCameraCapture] = useState(null)
    const [showCameraModal, setShowCameraModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    return (
        <ContainerScroll>
            <ContainerUser>

                <ImgProfile source={require("../assets/img/medico4.jpg")} />

                <Title> Dr. Claudio </Title>

                <ProfileData>
                    <ContentTxt>Clínico geral</ContentTxt>
                    <ContentTxt>CRM-15286</ContentTxt>
                </ProfileData>
                <ContainerScroll>
                    <BoxInput>
                        <TitleInput> Descrição da consulta </TitleInput>
                        <InputBlock> O paciente possuí uma infecção no
                            ouvido. Necessário repouse de 2 dias
                            e acompanhamento médico constante </InputBlock>
                    </BoxInput>

                    <BoxInput>
                        <TitleInput> Diagnóstico do paciente </TitleInput>
                        <InputBlock> Infecção no ouvido </InputBlock>
                    </BoxInput>

                    <BoxInput>
                        <TitleInput> Prescrição medica </TitleInput>
                        <InputBlock> Medicamento: Advil
                            Dosagem: 50 mg
                            Frequência: 3 vezes ao dia
                            Duração: 3 dias </InputBlock>
                    </BoxInput>

                    <BoxInput>
                        <TitleInput> Exames médicos </TitleInput>
                        <InputBlockImg>
                            <MaterialCommunityIcons
                                name="file-alert-outline"
                                size={18}
                                color="#33303E"
                            />
                            <InpBlockImgTxt>Nenhuma foto informada</InpBlockImgTxt>
                        </InputBlockImg>
                    </BoxInput>

                    <RowButtonVisu>
                        <View style={{ width: "50%" }}>
                            <ButtonVisu onPress={() => setOpenModal(true)}>
                                <MaterialIcons
                                    name="add-photo-alternate"
                                    size={20}
                                    color="white"
                                />
                                <ButtonVisuTxt>Enviar</ButtonVisuTxt>
                            </ButtonVisu>
                        </View>

                        <View style={{ width: "50%", alignContent: "center", justifyContent: "center" }}>
                            <RedLinkCancel> Cancelar </RedLinkCancel>
                        </View>
                    </RowButtonVisu>

                    <BoxInput>
                        <TitleInput> Resultado de análises clínicas </TitleInput>
                        <InputBlock> Sangue: tudo normal </InputBlock>
                    </BoxInput>
                </ContainerScroll>

                <LinkCancel onPress={() => navigation.replace("Main")}>
                    Voltar
                </LinkCancel>
            </ContainerUser>

            {/* Alteração que fez funcionar o modal */}
            {openModal ? (<CameraModal/>) : (<></>)}
        </ContainerScroll>
    );
}

export default PatientVisuRecord;