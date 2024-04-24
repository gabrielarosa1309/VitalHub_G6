import React, { useState } from 'react';
import { Container2 } from "../components/Container/Style";
import { DefaultText, TextBox } from "../components/DefaultText/Style";
import { ButtonReset, ButtonTxt } from "../components/EntryButton/Style";
import { Input } from "../components/Input/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { Text } from "react-native";
import api from '../Service/Service';

export const ResetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        if (!email) {
            setEmailError('E-mail é obrigatório');
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setEmailError('E-mail inválido');
            return false;
        }
        setEmailError('');
        return true;
    };

async function handleSubmit() {


        api.post(`/RecuperarSenha?email=${email}`).then((response) => {

            navigation.replace("VerifyEmail", {email : email});

        }).catch(error => console.log(error))

        
        
    
}



    return (
        <Container2>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Recuperar senha </Title>

            <TextBox>
                <DefaultText> Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha </DefaultText>
            </TextBox>

            <Input
                placeholder="Usuário ou E-mail"
                value={email}
                onChangeText={(txt) => setEmail(txt)}
                style={emailError ? { borderColor: 'red' } : {}}
            />
            {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}

            <ButtonReset onPress={() => handleSubmit()}>
                <ButtonTxt> CONTINUAR </ButtonTxt>
            </ButtonReset>
        </Container2>
    );
}
export default ResetPassword;
