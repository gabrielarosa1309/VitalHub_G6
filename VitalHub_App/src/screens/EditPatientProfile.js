import { Container, ContainerScroll } from "../components/Container/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow, InputInsert } from "../components/Input/Style";
import { LinkCancel } from "../components/Links/Style";
import { Subtitle, Title, TitleInput } from "../components/Title/Style";

export const EditPatientProfile = ({ navigation }) => {
    return (
        <Container>
            <ImgProfile source={require("../assets/img/chewie.jpg")} />

            <Title> Chewie </Title>
            <Subtitle> chewie@email.com </Subtitle>

            <ContainerScroll>
                <BoxInput>
                    <TitleInput> Data de nascimento </TitleInput>
                    <InputInsert placeholder="Insira sua data de nascimento" />
                </BoxInput>

                <BoxInput>
                    <TitleInput> CPF </TitleInput>
                    <InputInsert placeholder="Insira seu cpf" />
                </BoxInput>

                <BoxInput>
                    <TitleInput> Endereço </TitleInput>
                    <InputInsert placeholder="Insira seu endereço" />
                </BoxInput>

                <DirectionRow>
                    <BoxInputRow>
                        <TitleInput> Cep </TitleInput>
                        <InputInsert placeholder="Data de nascimento" />
                    </BoxInputRow>

                    <BoxInputRow>
                        <TitleInput> Cidade </TitleInput>
                        <InputInsert placeholder="Cidade" />
                    </BoxInputRow>
                </DirectionRow>

                <Button onPress={() => navigation.navigate("Main")}>
                    <ButtonTxt> SALVAR </ButtonTxt>
                </Button>

            </ContainerScroll>

            <LinkCancel onPress={() => navigation.navigate("Main")}>
                Cancelar
            </LinkCancel>

        </Container>
    );
}
export default EditPatientProfile;