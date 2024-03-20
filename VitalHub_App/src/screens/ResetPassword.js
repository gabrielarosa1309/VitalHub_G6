import { Container2 } from "../components/Container/Style";
import { DefaultText, TextBox } from "../components/DefaultText/Style";
import { ButtonReset, ButtonTxt } from "../components/EntryButton/Style";
import { Input } from "../components/Input/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";

export const ResetPassword = ({ navigation }) => {
    return (
        <Container2>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Recuperar senha </Title>

            <TextBox>
                <DefaultText> Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha </DefaultText>
            </TextBox>

            <Input placeholder="Usuário ou E-mail" />

            <ButtonReset onPress={() => navigation.navigate("VerifyEmail")}>
                <ButtonTxt> CONTINUAR </ButtonTxt>
            </ButtonReset>
        </Container2>
    );
}
export default ResetPassword;