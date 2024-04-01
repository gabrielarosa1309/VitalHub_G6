import React, { useState } from 'react';
import { Container } from "../components/Container/Style";
import { DefaultText, TextBox } from "../components/DefaultText/Style";
import { ButtonReset, ButtonTxt } from "../components/EntryButton/Style";
import { Input } from "../components/Input/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { Text } from "react-native";

export const SetPassword = () => {
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [confirmSenhaError, setConfirmSenhaError] = useState('');

    const validateSenha = (senha) => {
        if (!senha) {
            setSenhaError('Senha é obrigatória');
            return false;
        } else if (senha.length < 8) {
            setSenhaError('Senha deve ter pelo menos 8 caracteres');
            return false;
        }
        // Adicione aqui outras regras de validação de senha conforme necessário
        setSenhaError('');
        return true;
    };

    const validateConfirmSenha = (senha, confirmSenha) => {
        if (senha !== confirmSenha) {
            setConfirmSenhaError('As senhas não coincidem');
            return false;
        }
        setConfirmSenhaError('');
        return true;
    };

    const handleSubmit = () => {
        if (validateSenha(senha) && validateConfirmSenha(senha, confirmSenha)) {
            // Aqui você pode adicionar a lógica para redefinir a senha
            console.log("Senha redefinida com sucesso.");
        }
    };

    return (
        <Container>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Redefinir senha </Title>

            <TextBox>
                <DefaultText> Insira e confirme a sua nova senha </DefaultText>
            </TextBox>

            <Input
                placeholder="Nova senha"
                secureTextEntry
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
                style={senhaError ? { borderColor: 'red' } : {}}
            />
            {senhaError && <Text style={{ color: 'red' }}>{senhaError}</Text>}

            <Input
                placeholder="Confirmar nova senha"
                secureTextEntry
                value={confirmSenha}
                onChangeText={(txt) => setConfirmSenha(txt)}
                style={confirmSenhaError ? { borderColor: 'red' } : {}}
            />
            {confirmSenhaError && <Text style={{ color: 'red' }}>{confirmSenhaError}</Text>}

            <ButtonReset onPress={handleSubmit}>
                <ButtonTxt> CONFIRMAR NOVA SENHA </ButtonTxt>
            </ButtonReset>
        </Container>
    );
}
export default SetPassword;
