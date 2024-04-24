import {  useEffect, useState } from "react";
import { Container, ContainerScroll } from "../components/Container/Style";
import { Button, ButtonCamera, ButtonTxt, ContainerImage, ExitButton } from "../components/EntryButton/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow } from "../components/Input/Style";
import { Subtitle, Title, TitleInput } from "../components/Title/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDecodeToken } from "../utils/auth/auth"
import { View } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import CameraModal from "../components/CameraModal/CameraModal";

export const PatientProfile = ({ navigation }) => {
    const [userData, setUserData] = useState({})
    const [profileData, setProfileData] = useState({})
    const [dataCheck, setDataCheck] = useState({})
    const [open, setOpen] = useState(false)

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
            setProfileData({dataNascimento: "DD/MM/AAAA",
                cpf: "cpf",
                endereco: "endereco",
                cep: "cep",
                cidade: "cidade"})}
                else{
                    
                    setProfileData(JSON.parse(data))
                    console.log("dados edit");
                   console.log(profileData);
                }
                
        }
       
  
    

    useEffect(() => {
    
        
        profileLoad(); 

        EditLoad();
       
            
        

    

        

        
    }, [])

   

   


    return (
        <Container>
            {open ? (<CameraModal
            getMediaLibrary={true}
            />) : (<></>)}
            <ContainerImage>
            <ImgProfile source={require("../assets/img/chewie.jpg")} />

            <ButtonCamera
            onPress={() => {setOpen(true)}}
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