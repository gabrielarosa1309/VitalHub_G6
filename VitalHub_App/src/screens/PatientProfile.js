import { useEffect, useState } from "react";
import { Container, ContainerScroll } from "../components/Container/Style";
import { Button, ButtonTxt, ExitButton } from "../components/EntryButton/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow } from "../components/Input/Style";
import { Subtitle, Title, TitleInput } from "../components/Title/Style";
import { userDecodeToken } from "../utils/Auth";

export const PatientProfile = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    async function profileLoad() {
        const token = await userDecodeToken();

        if (token) {
            setName(token.name),
            setEmail(token.email)
        }
    }

    async function logout() {
        await AsyncStorage.removeItem('token');
        navigation.navigate("Login")
    }

    useEffect(() => {
        profileLoad();
    }, [])

    return (
        <Container>
            <ImgProfile source={require("../assets/img/chewie.jpg")} />

            <Title> {name} </Title>
            <Subtitle> {email} </Subtitle>

            <ContainerScroll>
                <BoxInput>
                    <TitleInput> Data de nascimento </TitleInput>
                    <InputBlock> 08/08/2018 </InputBlock>
                </BoxInput>

                <BoxInput>
                    <TitleInput> CPF </TitleInput>
                    <InputBlock> 859******** </InputBlock>
                </BoxInput>

                <BoxInput>
                    <TitleInput> Endereço </TitleInput>
                    <InputBlock> Rua Luis Ântico, 623 </InputBlock>
                </BoxInput>

                <DirectionRow>
                    <BoxInputRow>
                        <TitleInput> Cep </TitleInput>
                        <InputBodyRow>09360-610</InputBodyRow>
                    </BoxInputRow>

                    <BoxInputRow>
                        <TitleInput> Cidade </TitleInput>
                        <InputBodyRow>Mauá-SP</InputBodyRow>
                    </BoxInputRow>
                </DirectionRow>

                <Button onPress={() => navigation.navigate("EditPatientProfile")}>
                    <ButtonTxt> EDITAR </ButtonTxt>
                </Button>

                <ExitButton onPress={() => logout()}>
                    <ButtonTxt> Sair </ButtonTxt>
                </ExitButton>

            </ContainerScroll>

        </Container>
    );
}
export default PatientProfile;