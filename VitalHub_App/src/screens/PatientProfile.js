import { useEffect, useState } from "react";
import { Container, ContainerScroll } from "../components/Container/Style";
import { Button, ButtonCamera, ButtonTxt, ContainerImage, ExitButton } from "../components/EntryButton/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow } from "../components/Input/Style";
import { Subtitle, Title, TitleInput } from "../components/Title/Style";
import { userDecodeToken } from "../utils/auth/auth"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CameraModal from "../components/CameraModal/CameraModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../Service/Service";

export const PatientProfile = ({ navigation, route }) => {
    const [userData, setUserData] = useState({})
    const [profileData, setProfileData] = useState({})
    const [uriCameraCapture, setsetUriCameraCapture] = useState(null) //Traz da camera o caminho da imagem por meio da funcao de capturar a foto
    const [open, setOpen] = useState(false)

    async function LogOut() {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }

    async function AlterarFotoPerfil() {
        const formData = new FormData();
        formData.append("Arquivo",
            {
                uri: uriCameraCapture,
                name: `image.${uriCameraCapture.split(".")[1]}`,
                type: `image/${uriCameraCapture.split(".")[1]}`
            })

        console.log("form data");
        console.log(formData);

        await api.put(`/Usuario/AlterarFotoPerfil?id=${userData.user}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => { console.log(response.status); setUserData({ ...userData, foto: uriCameraCapture }) })
            .catch((error) => console.log(error))
    }

    async function profileLoad() {
        const data = await userDecodeToken();
        setUserData(data)
    }

    async function EditLoad() {
        const data = await AsyncStorage.getItem('profileInfo');

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

        }
    }

    useEffect(() => {
        profileLoad();
    }, [])

    useEffect(() => {
        if (profileData) {
            EditLoad()
        }
    }, [profileData])

    useEffect(() => {
        if (uriCameraCapture) {
            AlterarFotoPerfil()
        }
    }, [uriCameraCapture])
    
    return (
        <Container>
            {open ? (<CameraModal
                setUriCameraCapture={setsetUriCameraCapture}
                getMediaLibrary={true}
                fecharModal={setOpen}
            // attPhotoProfile={ () => AlterarFotoPerfil() }
            />) : (<></>)}
            <ContainerImage>
                <ImgProfile source={{ uri: uriCameraCapture }} />

                <ButtonCamera
                    onPress={() => { setOpen(true) }}
                >
                    <MaterialCommunityIcons
                        name="camera-plus"
                        size={20}
                        color={'#fbfbfb'}
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

            </ContainerScroll>

        </Container>
    );
}
export default PatientProfile;