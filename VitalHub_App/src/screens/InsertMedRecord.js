import { View } from "react-native";
import { ProfileData } from "../components/AppointmentCard/Style";
import { Container } from "../components/Container/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { ContentTxt } from "../components/MedRecordModal/Style";
import { Title, TitleInput } from "../components/Title/Style";
import { BigInputInsert, BoxInput, BoxInputMed, InputInsert } from "../components/Input/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";

export const InsertMedRecord = () => {
    return (
        <Container>
            {/* <ImgProfile source={require("../assets/img/chewie.jpg")} /> */}

            <Title> Chewie </Title>

            <ProfileData>
                <ContentTxt>6 anos</ContentTxt>
                <ContentTxt>chewie@email.com</ContentTxt>
            </ProfileData>

            <BoxInputMed>
                <TitleInput> Descrição da consulta </TitleInput>
                <BigInputInsert placeholder="Descrição" />
            </BoxInputMed>

            <BoxInputMed>
                <TitleInput> Diagnóstico do paciente </TitleInput>
                <InputInsert placeholder="Diagnóstico" />
            </BoxInputMed>
            
            <BoxInputMed>
                <TitleInput> Prescrição medica </TitleInput>
                <BigInputInsert placeholder="Prescrição medica" />
            </BoxInputMed>

            <Button>
                <ButtonTxt> SALVAR </ButtonTxt>
            </Button>

            <LinkCancel>
                Cancelar
            </LinkCancel>

        </Container>
    );
}

export default InsertMedRecord;