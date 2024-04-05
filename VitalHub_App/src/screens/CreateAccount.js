import React, { useState } from 'react';
import { Container, Container2 } from "../components/Container/Style";
import { DefaultText, TextBox } from "../components/DefaultText/Style";
import { ButtonReset, ButtonTxt } from "../components/EntryButton/Style";
import { Input } from "../components/Input/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { LinkCancel } from "../components/Links/Style";
import { Text } from "react-native";

export const CreateAccount = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [confirmSenhaError, setConfirmSenhaError] = useState('');

    const validateEmail = (email) => {
        if (!email) {
            return 'E-mail é obrigatório';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return 'E-mail inválido';
        }
        return '';
    };

    const validateSenha = (senha) => {
        if (!senha) {
            return 'Senha é obrigatória';
        } else if (senha.length < 8) {
            return 'Senha deve ter pelo menos 8 caracteres';
        }
        return '';
    };

    const validateConfirmSenha = (senha, confirmSenha) => {
        if (senha !== confirmSenha) {
            return 'As senhas não coincidem';
        }
        return '';
    };

    const handleSubmit = () => {
        const emailError = validateEmail(email);
        const senhaError = validateSenha(senha);
        const confirmSenhaError = validateConfirmSenha(senha, confirmSenha);

        setEmailError(emailError);
        setSenhaError(senhaError);
        setConfirmSenhaError(confirmSenhaError);

        if (!emailError && !senhaError && !confirmSenhaError) {
            // Aqui você pode adicionar a lógica para criar a conta
            console.log("Dados válidos, prosseguir com a criação da conta.");
        }
    };

    return (
        <Container2>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Criar conta </Title>

            <TextBox>
                <DefaultText> Insira seu endereço de e-mail e senha para realizar seu cadastro. </DefaultText>
            </TextBox>

            <Input
                placeholder="Usuário ou E-mail"
                value={email}
                onChangeText={(txt) => setEmail(txt)}
                style={emailError ? { borderColor: 'red' } : {}}
            />
            {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}

            <Input
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
                style={senhaError ? { borderColor: 'red' } : {}}
            />
            {senhaError && <Text style={{ color: 'red' }}>{senhaError}</Text>}

            <Input
                placeholder="Confirmar senha"
                secureTextEntry
                value={confirmSenha}
                onChangeText={(txt) => setConfirmSenha(txt)}
                style={confirmSenhaError ? { borderColor: 'red' } : {}}
            />
            {confirmSenhaError && <Text style={{ color: 'red' }}>{confirmSenhaError}</Text>}

            <ButtonReset onPress={handleSubmit}>
                <ButtonTxt> CADASTRAR </ButtonTxt>
            </ButtonReset>

            <LinkCancel onPress={() => navigation.replace("Login")}>
                Cancelar
            </LinkCancel>
        </Container2>
    );
}
export default CreateAccount;
