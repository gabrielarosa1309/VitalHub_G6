import { Container, ContainerLogin } from "../components/Container/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { Input } from "../components/Input/Style";
import { LinkMedium } from "../components/Links/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { GoogleButton, IconGoogleButton, TitleGoogleButton } from "../components/GoogleButton/Style";
import { CreateAccount, LinkCreateAccount, TextCreateAccount } from "../components/CreateAccount/Style";
import api from '../Service/Service'
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Text } from "react-native";
import Loader from "../components/Loader/Loader";
import { ErrorText, TextLoader, TextLoaderAlign } from "../components/Loader/Style";

export const Login = ({ navigation }) => {

    const [load, setLoad] = useState(false)
    const [email, setEmail] = useState("henrique@gmail.com");
    const [senha, setSenha] = useState("123456");
    const [errorMessage, setErrorMessage] = useState(false);



    async function Login() {
if (email.trim() == "" || senha.trim().length < 6) {
    alert('Preencha os campos corretamente')
    return
}

       try {

        
        const response = await api.post('http://192.168.21.129:4466/api/Login', {

        email: email,
        senha: senha
        
    })
    
    await AsyncStorage.setItem('token', JSON.stringify(response.data))

    navigation.navigate('Main')

setLoad(true)

       } catch (error) {
        setLoad(true)
        setErrorMessage(true)
        setTimeout(() => {

setLoad(false)
setErrorMessage(false)
        }, 3000)
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
            onChangeText={((txt) => setEmail(txt))}
            />

            <Input 
            placeholder="Senha" 
            secureTextEntry 
            value={senha}
            onChangeText={((txt) => setSenha(txt))}
            />

            <LinkMedium onPress={() => navigation.navigate("ResetPassword")}>
                Esqueceu sua senha?
            </LinkMedium>

            <Button onPress={() => Login()}>
                {errorMessage ? <ErrorText>Informacoes de login incorretas</ErrorText> : null}
                {load ? (<Loader/>) : null}
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