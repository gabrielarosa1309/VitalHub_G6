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
    const [userData, setUserData] = useState({})
    const [profileData, setProfileData] = useState({})
    const [dataCheck, setDataCheck] = useState({})

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

    async function EditLoad() {
        const data = await AsyncStorage.getItem('profileInfo');
        console.log(data);
        if (data === null) {
            setProfileData({
                dataNascimento: "DD/MM/AAAA",
                cpf: "cpf",
                endereco: "endereco",
                cep: "cep",
                cidade: "cidade"
            })
        }
        else {

            setProfileData(JSON.parse(data))
            console.log("dados edit");
            console.log(profileData);
        }
    }

    async function AlterarFotoPerfil() {
        const formData = new FormData();

        formData.append("Arquivo", {
            uri : uriCameraCapture,
            name : `image.${ uriCameraCapture.split(".")[1] }`,
            type: `image/${ uriCameraCapture.split(".")[1] }`
        })

        await api.put(`/Usuario/AlterarFotoPerfil?id=${profile.user}`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }).then( response => {
            await setProfileUpdate({
                
            })
        }).then( error => {
            console.log(error);
        })
    }

    useEffect(() => {
        profileLoad();
        EditLoad();
    }, [])

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
                    <InputBlock>
                        {profileData.dataNascimento}
                    </InputBlock>
                </BoxInput>

                <BoxInput>
                    <TitleInput> CPF </TitleInput>
                    <InputBlock>
                        {profileData.cpf}
                    </InputBlock>
                </BoxInput>

                <BoxInput>
                    <TitleInput> Endereço </TitleInput>
                    <InputBlock>
                        {profileData.endereco}
                    </InputBlock>
                </BoxInput>

                <DirectionRow>
                    <BoxInputRow>
                        <TitleInput> Cep </TitleInput>
                        <InputBodyRow>
                            {profileData.cep}
                        </InputBodyRow>
                    </BoxInputRow>

                    <BoxInputRow>
                        <TitleInput> Cidade </TitleInput>
                        <InputBodyRow>
                            {profileData.cidade}
                        </InputBodyRow>
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