import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Container2 } from "../components/Container/Style";
import { DefaultText, TextBox } from "../components/DefaultText/Style";
import { ButtonReset, ButtonTxt } from "../components/EntryButton/Style";
import { Input } from "../components/Input/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { LinkCancel } from "../components/Links/Style";
import { Alert, Text } from "react-native";
import api from '../Service/Service';

export const CreateAccount = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');

    //STATES DAS VALIDAÇÕES
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const [nomeError, setNomeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [confirmSenhaError, setConfirmSenhaError] = useState('');

    const validateForm = () => {
        let isValid = true;

        if (!nome) {
            setNomeError('Por favor, insira seu nome.');
            isValid = false;
        } else {
            setNomeError('');
        }

        if (!emailRegex.test(email)) {
            setEmailError("Por favor, insira um e-mail válido.");
            return false;
        } else {
            setEmailError('');
        }

        if (!senha) {
            setSenhaError('Por favor, insira sua senha.');
            isValid = false;
        } else {
            setSenhaError('');
        }

        if (!confirmSenha) {
            setConfirmSenhaError('Por favor, confirme sua senha.');
            isValid = false;
        } else if (senha !== confirmSenha) {
            setConfirmSenhaError('As senhas não correspondem.');
            isValid = false;
        } else {
            setConfirmSenhaError('');
        }

        return isValid;
    };

    async function CadastrarPaciente() { 
        if (validateForm()) {
            try {
                const cadastro = {
                    nome,
                    email,
                    senha,
                    idTipoUsuario : "201359D7-8813-493C-BFA6-DDAA0AD96861"
                }
                console.log(cadastro);

                const response = await api.post('/Pacientes', cadastro);

                if (response.status === 200) {
                    console.log("Usuário cadastrado com sucesso!");
                    navigation.navigate("Login")
                } 
                
            } catch (error) {
                console.error("Erro na chamada da API:", error);
                Alert.alert("Erro", "Falha ao cadastrar usuário. Por favor, tente novamente.");
            }
        }
    }

    return (
        <Container2>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Criar conta </Title>

            <TextBox>
                <DefaultText> Insira seu endereço de e-mail e senha para realizar seu cadastro. </DefaultText>
            </TextBox>

            <Input
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={nomeError ? { borderColor: 'red' } : {}}
            />
            {nomeError.length > 0 && <Text style={styles.errorText}>{nomeError}</Text>}


            <Input
                placeholder="Usuário ou E-mail"
                value={email}
                onChangeText={setEmail}
                style={emailError ? { borderColor: 'red' } : {}}
            />
            {emailError.length > 0 && <Text style={styles.errorText}>{emailError}</Text>}

            <Input
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                style={senhaError ? { borderColor: 'red' } : {}}
            />
            {senhaError.length > 0 && <Text style={styles.errorText}>{senhaError}</Text>}

            <Input
                placeholder="Confirmar senha"
                secureTextEntry
                value={confirmSenha}
                onChangeText={setConfirmSenha}
                style={confirmSenhaError ? { borderColor: 'red' } : {}}
            />
            {confirmSenhaError.length > 0 && <Text style={styles.errorText}>{confirmSenhaError}</Text>}

            <ButtonReset onPress={CadastrarPaciente}>
                <ButtonTxt> CADASTRAR </ButtonTxt>
            </ButtonReset>

            <LinkCancel onPress={() => navigation.replace("Login")}>
                Cancelar
            </LinkCancel>
        </Container2>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: 'black',
        paddingLeft: 10,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

export default CreateAccount;