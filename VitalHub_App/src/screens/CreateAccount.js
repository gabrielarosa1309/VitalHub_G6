import { Container, Container2 } from "../components/Container/Style";
import { DefaultText, TextBox } from "../components/DefaultText/Style";
import { ButtonReset, ButtonTxt } from "../components/EntryButton/Style";
import { Input } from "../components/Input/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { LinkCancel } from "../components/Links/Style";

export const CreateAccount = ({navigation}) => {
    return (
        <Container2>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />

            <Title> Criar conta </Title>

            <TextBox>
                <DefaultText> Insira seu endereço de e-mail e senha para realizar seu cadastro. </DefaultText>
            </TextBox>

            <Input placeholder="Usuário ou E-mail" />

            <Input placeholder="Senha" />

            <Input placeholder="Confirmar senha" />

            <ButtonReset>
                <ButtonTxt> CADASTRAR </ButtonTxt>
            </ButtonReset>

            <LinkCancel onPress={() => navigation.replace("Login")}>
                Cancelar
            </LinkCancel>
        </Container2>
    );
}
export default CreateAccount;