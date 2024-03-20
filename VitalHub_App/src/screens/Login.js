import { Container, ContainerLogin } from "../components/Container/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { Input } from "../components/Input/Style";
import { LinkMedium } from "../components/Links/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { GoogleButton, IconGoogleButton, TitleGoogleButton } from "../components/GoogleButton/Style";
import { CreateAccount, LinkCreateAccount, TextCreateAccount } from "../components/CreateAccount/Style";
import Home from "./Home";

export const Login = ({ navigation }) => {
    async function Login() {
        navigation.replace("Main")
    }

    async function ResetPassword() {
        navigation.navigate("ResetPassword")
    }

    function name(params) {
        
    }

    return (
        <ContainerLogin>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Entrar ou criar conta </Title>

            <Input placeholder="Usuário ou E-mail" />

            <Input placeholder="Senha" secureTextEntry />

            <LinkMedium onPress={() => navigation.navigate("ResetPassword")}>
                Esqueceu sua senha?
            </LinkMedium>

            <Button onPress={() => Login()}>
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