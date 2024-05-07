import { Container } from "../components/Container/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { BoxInput, InputBlock } from "../components/Input/Style";
import { LinkCancel } from "../components/Links/Style";
import { ContentTxt } from "../components/MedRecordModal/Style";
import { ProfileData } from "../components/PatientAppCard/Style";
import { Title, TitleInput } from "../components/Title/Style";

export const MedPatientRecord = () => {
    return (
        <Container>
            {/* <ImgProfile source={require("../assets/img/chewie.jpg")} /> */}

            <Title> Chewie </Title>

            <ProfileData>
                <ContentTxt>6 anos</ContentTxt>
                <ContentTxt>chewie@email.com</ContentTxt>
            </ProfileData>

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

            <Button>
                <ButtonTxt> SALVAR </ButtonTxt>
            </Button>

            <Button>
                <ButtonTxt> EDITAR </ButtonTxt>
            </Button>

            <LinkCancel>
                Cancelar
            </LinkCancel>

        </Container>
    );
}
export default MedPatientRecord;