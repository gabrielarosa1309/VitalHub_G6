import { Container } from "../components/Container/Style";
import { DefaultText, DefaultTextBlue, TextBox } from "../components/DefaultText/Style";
import { ButtonReset, ButtonTxt } from "../components/EntryButton/Style";
import { InputBoxVerify, InputVerify } from "../components/Input/Style";
import { LinkCancel } from "../components/Links/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";

export const VerifyEmail = ({ navigation }) => {
    return (
        <Container>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Verifique seu e-mail </Title>

            <TextBox>
                <DefaultText> Digite o código de 4 dígitos enviado para </DefaultText>
                <DefaultTextBlue> username@email.com </DefaultTextBlue>
            </TextBox>

            <InputBoxVerify>
                <InputVerify>0</InputVerify>
                <InputVerify>0</InputVerify>
                <InputVerify>0</InputVerify>
                <InputVerify>0</InputVerify>
            </InputBoxVerify>

            <ButtonReset onPress={() => navigation.navigate("SetPassword")}>
                <ButtonTxt> Continuar </ButtonTxt>
            </ButtonReset>

            <LinkCancel>Reenviar código</LinkCancel>
        </Container>
    );
}
export default VerifyEmail;