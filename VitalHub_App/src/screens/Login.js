import { Container, ContainerLogin } from "../components/Container/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { Input } from "../components/Input/Style";
import { LinkMedium } from "../components/Links/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { GoogleButton, IconGoogleButton, TitleGoogleButton } from "../components/GoogleButton/Style";
import { CreateAccount, LinkCreateAccount, TextCreateAccount } from "../components/CreateAccount/Style";
import { useState } from "react";
import api from "../service/service";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function LoginApi() {
        try {
            const response = await api.post('/Login', {
                email: email,
                senha: senha
            });

            await AsyncStorage.setItem('token', JSON.stringify(response.data))
            navigation.navigate("Main")
        } catch (error) {
            console.error("Erro na chamada da API:", error);
        }
    }
    

    async function ResetPassword() {
        navigation.navigate("ResetPassword")
    }

    return (
        <ContainerLogin>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Entrar ou criar conta </Title>

            <Input
                placeholder="Usuário ou E-mail"
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />

            <Input
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            />

            <LinkMedium onPress={() => navigation.navigate("ResetPassword")}>
                Esqueceu sua senha?
            </LinkMedium>

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