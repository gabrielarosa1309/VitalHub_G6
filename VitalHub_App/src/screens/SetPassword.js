import { Container } from "../components/Container/Style";
import { DefaultText, TextBox } from "../components/DefaultText/Style";
import { ButtonReset, ButtonTxt } from "../components/EntryButton/Style";
import { Input } from "../components/Input/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";

export const SetPassword = () => {
    return (
        <Container>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Redefinir senha </Title>

            <TextBox>
                <DefaultText> Insira e confirme a sua nova senha </DefaultText>
            </TextBox>

            <Input placeholder="Nova senha" />

            <Input placeholder="Confirmar nova senha" />

            <ButtonReset>
                <ButtonTxt> CONFIRMAR NOVA SENHA </ButtonTxt>
            </ButtonReset>
        </Container>
    );
}
export default SetPassword;