import React, { useState } from 'react';
import { View } from "react-native";
import { ProfileData } from "../components/AppointmentCard/Style";
import { Container } from "../components/Container/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { ContentTxt } from "../components/MedRecordModal/Style";
import { Title, TitleInput } from "../components/Title/Style";
import { BigInputInsert, BoxInput, BoxInputMed, InputInsert } from "../components/Input/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { Text } from "react-native";

export const InsertMedRecord = () => {
    const [descricao, setDescricao] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [prescricao, setPrescricao] = useState('');
    const [descricaoError, setDescricaoError] = useState('');
    const [diagnosticoError, setDiagnosticoError] = useState('');
    const [prescricaoError, setPrescricaoError] = useState('');

    const validateCampos = () => {
        let isValid = true;

        if (!descricao) {
            setDescricaoError('Descrição é obrigatória');
            isValid = false;
        } else {
            setDescricaoError('');
        }

        if (!diagnostico) {
            setDiagnosticoError('Diagnóstico é obrigatório');
            isValid = false;
        } else {
            setDiagnosticoError('');
        }

        if (!prescricao) {
            setPrescricaoError('Prescrição médica é obrigatória');
            isValid = false;
        } else {
            setPrescricaoError('');
        }

        return isValid;
    };

    const handleSubmit = () => {
        if (validateCampos()) {
            // Aqui você pode adicionar a lógica para salvar o registro médico
            console.log("Registro médico salvo com sucesso.");
        }
    };

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
                <BigInputInsert
                    placeholder="Descrição"
                    value={descricao}
                    onChangeText={(txt) => setDescricao(txt)}
                    style={descricaoError ? { borderColor: 'red' } : {}}
                />
                {descricaoError && <Text style={{ color: 'red' }}>{descricaoError}</Text>}
            </BoxInputMed>

            <BoxInputMed>
                <TitleInput> Diagnóstico do paciente </TitleInput>
                <InputInsert
                    placeholder="Diagnóstico"
                    value={diagnostico}
                    onChangeText={(txt) => setDiagnostico(txt)}
                    style={diagnosticoError ? { borderColor: 'red' } : {}}
                />
                {diagnosticoError && <Text style={{ color: 'red' }}>{diagnosticoError}</Text>}
            </BoxInputMed>
            
            <BoxInputMed>
                <TitleInput> Prescrição medica </TitleInput>
                <BigInputInsert
                    placeholder="Prescrição medica"
                    value={prescricao}
                    onChangeText={(txt) => setPrescricao(txt)}
                    style={prescricaoError ? { borderColor: 'red' } : {}}
                />
                {prescricaoError && <Text style={{ color: 'red' }}>{prescricaoError}</Text>}
            </BoxInputMed>

            <Button onPress={handleSubmit}>
                <ButtonTxt> SALVAR </ButtonTxt>
            </Button>

            <LinkCancel>
                Cancelar
            </LinkCancel>

        </Container>
    );
}

export default InsertMedRecord;
