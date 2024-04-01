import React, { useState } from 'react';
import { Container, ContainerScroll } from "../components/Container/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow, InputInsert } from "../components/Input/Style";
import { LinkCancel } from "../components/Links/Style";
import { Subtitle, Title, TitleInput } from "../components/Title/Style";
import { Text } from "react-native";

export const EditPatientProfile = ({ navigation }) => {
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [dataNascimentoError, setDataNascimentoError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [enderecoError, setEnderecoError] = useState('');
    const [cepError, setCepError] = useState('');
    const [cidadeError, setCidadeError] = useState('');

    const validateCampos = () => {
        let isValid = true;

        if (!dataNascimento.trim()) {
            setDataNascimentoError('Data de nascimento é obrigatória');
            isValid = false;
        } else {
            setDataNascimentoError('');
        }

        if (!cpf.trim()) {
            setCpfError('CPF é obrigatório');
            isValid = false;
        } else {
            setCpfError('');
        }

        if (!endereco.trim()) {
            setEnderecoError('Endereço é obrigatório');
            isValid = false;
        } else {
            setEnderecoError('');
        }

        if (!cep.trim()) {
            setCepError('CEP é obrigatório');
            isValid = false;
        } else {
            setCepError('');
        }

        if (!cidade.trim()) {
            setCidadeError('Cidade é obrigatória');
            isValid = false;
        } else {
            setCidadeError('');
        }

        return isValid;
    };

    const handleSubmit = () => {
        if (validateCampos()) {
            // Aqui você pode adicionar a lógica para salvar o perfil do paciente
            console.log("Perfil do paciente salvo com sucesso.");
        }
    };

    return (
        <Container>
            <ImgProfile source={require("../assets/img/chewie.jpg")} />

            <Title> Chewie </Title>
            <Subtitle> chewie@email.com </Subtitle>

            <ContainerScroll>
                <BoxInput>
                    <TitleInput> Data de nascimento </TitleInput>
                    <InputInsert
                        placeholder="Insira sua data de nascimento"
                        value={dataNascimento}
                        onChangeText={(txt) => setDataNascimento(txt)}
                        style={dataNascimentoError ? { borderColor: 'red' } : {}}
                    />
                    {dataNascimentoError && <Text style={{ color: 'red' }}>{dataNascimentoError}</Text>}
                </BoxInput>

                <BoxInput>
                    <TitleInput> CPF </TitleInput>
                    <InputInsert
                        placeholder="Insira seu cpf"
                        value={cpf}
                        onChangeText={(txt) => setCpf(txt)}
                        style={cpfError ? { borderColor: 'red' } : {}}
                    />
                    {cpfError && <Text style={{ color: 'red' }}>{cpfError}</Text>}
                </BoxInput>

                <BoxInput>
                    <TitleInput> Endereço </TitleInput>
                    <InputInsert
                        placeholder="Insira seu endereço"
                        value={endereco}
                        onChangeText={(txt) => setEndereco(txt)}
                        style={enderecoError ? { borderColor: 'red' } : {}}
                    />
                    {enderecoError && <Text style={{ color: 'red' }}>{enderecoError}</Text>}
                </BoxInput>

                <DirectionRow>
                    <BoxInputRow>
                        <TitleInput> Cep </TitleInput>
                        <InputInsert
                            placeholder="CEP"
                            value={cep}
                            onChangeText={(txt) => setCep(txt)}
                            style={cepError ? { borderColor: 'red' } : {}}
                        />
                        {cepError && <Text style={{ color: 'red' }}>{cepError}</Text>}
                    </BoxInputRow>

                    <BoxInputRow>
                        <TitleInput> Cidade </TitleInput>
                        <InputInsert
                            placeholder="Cidade"
                            value={cidade}
                            onChangeText={(txt) => setCidade(txt)}
                            style={cidadeError ? { borderColor: 'red' } : {}}
                        />
                        {cidadeError && <Text style={{ color: 'red' }}>{cidadeError}</Text>}
                    </BoxInputRow>
                </DirectionRow>

                <Button onPress={handleSubmit}>
                    <ButtonTxt> SALVAR </ButtonTxt>
                </Button>

            </ContainerScroll>

            <LinkCancel onPress={() => navigation.navigate("Main")}>
                Cancelar
            </LinkCancel>

        </Container>
    );
}
export default EditPatientProfile;
