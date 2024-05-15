import { ContainerLogin } from "../components/Container/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { Input } from "../components/Input/Style";
import { LinkMedium } from "../components/Links/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { GoogleButton, IconGoogleButton, TitleGoogleButton } from "../components/GoogleButton/Style";
import { CreateAccount, LinkCreateAccount, TextCreateAccount } from "../components/CreateAccount/Style";
import { useState } from "react";
import api from "../Service/Service";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, Alert } from "react-native";

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('henrique@gmail.com')
    const [senha, setSenha] = useState('123456')
    const [errorMessage, setErrorMessage] = useState(''); 

    // Função para validar o e-mail
    const validateEmail = (email) => {
        let error = '';
        if (!email) {
            error = 'E-mail é obrigatório';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            error = 'E-mail inválido';
        }
        return error;
    };

    // Função para validar a senha
    const validateSenha = (senha) => {
        let error = '';
        if (!senha) {
            error = 'Senha é obrigatória';
        } else if (senha.length < 6) {
            error = 'Senha deve ter pelo menos 6 caracteres';
        }
        return error;
    };

    async function LoginApi() {
        const emailError = validateEmail(email);
        const senhaError = validateSenha(senha);

        if (emailError || senhaError) {
            setErrorMessage("Email ou senha inválidos");
            return;
        }

        try {
            const response = await api.post('/Login', {
                email: email,
                senha: senha
            });

            await AsyncStorage.setItem('token', JSON.stringify(response.data));

            navigation.navigate("Main");
            
        } catch (error) {
            console.error("Erro na chamada da API:", error);
            Alert.alert("Erro", "Falha ao fazer login. Por favor, tente novamente.");
        }
    }

    // async function ResetPassword() {
    //     navigation.navigate("ResetPassword")
    // }

    return (
        <ContainerLogin>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Entrar ou criar conta </Title>

            <Input
               
                placeholder="Usuário ou E-mail"
                value={email}
                onChangeText={(txt) => setEmail(txt)}
                style={errorMessage ? { borderColor: 'red' } : {}}
            />

            <Input
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
                style={errorMessage ? { borderColor: 'red' } : {}}
            />

            <LinkMedium onPress={() => navigation.replace("ResetPassword", {email: email})}>
                Esqueceu sua senha?
            </LinkMedium>

            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}

            <Button onPress={() => LoginApi()}>
                <ButtonTxt> ENTRAR </ButtonTxt>
            </Button>

            <GoogleButton>
                <IconGoogleButton source={require("../assets/icons/google.png")} />
                <TitleGoogleButton> ENTRAR COM GOOGLE </TitleGoogleButton>
            </GoogleButton>

            <CreateAccount>
                <TextCreateAccount>Não tem conta? </TextCreateAccount>
                <LinkCreateAccount onPress={() => navigation.navigate("CreateAccount")}>
                    Crie uma conta agora!
                </LinkCreateAccount>
            </CreateAccount>
        </ContainerLogin>
    );
}
export default Login;