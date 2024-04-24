import { useEffect, useState } from "react";
import { Container, ContainerImage, ContainerScroll } from "../components/Container/Style";
import { Button, ButtonCamera, ButtonTxt, ExitButton } from "../components/EntryButton/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow } from "../components/Input/Style";
import { Subtitle, Title, TitleInput } from "../components/Title/Style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDecodeToken } from "../utils/auth/auth";
import CameraModal from "../components/CameraModal/CameraModal";

export const PatientProfile = ({ navigation }) => {
    const [openModal, setOpenModal] = useState(false)

    async function LogOut() {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')

        // const info = await AsyncStorage.getItem('token')
        // console.log(info)
    }

    async function profileLoad() {
        const data = await userDecodeToken();
        setUserData(data)
    }

    useEffect(() => {
        profileLoad();
    }, [])

    const [userData, setUserData] = useState({})


    return (
        <Container>
            <ContainerImage>
                <ImgProfile source={require("../assets/img/chewie.jpg")} />

                <ButtonCamera onPress={() => setOpenModal(true)}>
                    <MaterialCommunityIcons
                        name="camera-plus"
                        size={20}
                        color="#fbfbfb"
                    />
                </ButtonCamera>
            </ContainerImage>

            <Title> {userData.name} </Title>
            <Subtitle> {userData.email} </Subtitle>

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

                <Button onPress={() => LogOut()}>
                    <ButtonTxt> Sair </ButtonTxt>
                </Button>

                {openModal ? (<CameraModal getMediaLibrary={true} />) : (<></>)}

            </ContainerScroll>

        </Container>
    );
}
export default PatientProfile;