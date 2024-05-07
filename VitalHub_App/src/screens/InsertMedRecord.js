import React, { useEffect, useState } from 'react';
import { ScrollView, ScrollViewBase, View } from "react-native";
import { ProfileData } from "../components/AppointmentCard/Style";
import { Container, ContainerImage } from "../components/Container/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { ContentTxt } from "../components/MedRecordModal/Style";
import { Title, TitleInput } from "../components/Title/Style";
import { BigInputInsert, BoxInput, BoxInputMed, InputInsert } from "../components/Input/Style";
import { Button, ButtonCamera, ButtonTxt, } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { Text } from "react-native";
import CameraModal from '../components/CameraModal/CameraModal';
import { userDecodeToken } from '../utils/Auth';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from '../Service/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const InsertMedRecord = ({navigation, route}) => {
    const [descricao, setDescricao] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [prescricao, setPrescricao] = useState('');
    const [descricaoError, setDescricaoError] = useState('');
    const [diagnosticoError, setDiagnosticoError] = useState('');
    const [prescricaoError, setPrescricaoError] = useState('');
    const [userData, setUserData] = useState({});
    const [open, setOpen] = useState(false);
    const [uriCameraCapture, setsetUriCameraCapture] = useState(null) //Traz da camera o caminho da imagem por meio da funcao de capturar a foto
    const [infoConsulta, setInfoConsulta] = useState([])
    async function profileLoad() {
        const data = await userDecodeToken();
        setUserData(data)
    }


    async function GetInfoConsulta() {

        const token = JSON.parse( await AsyncStorage.getItem("token") ).token //o .token Serve para desencapsular o token do json 
      
        const infoConsulta = await api.get(`/Consultas/BuscarPorId?id=${route.params.idConsulta}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
          }) 
        console.log(infoConsulta.data);
        setInfoConsulta(infoConsulta.data)
        
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

        await api.put(`/Usuario/AlterarFotoPerfil?id=${userData.user}`, formData, { headers: {"Content-Type" : "multipart/form-data"}})
        .then((response) => {console.log(response.status); setUserData({ ...userData, foto : uriCameraCapture})})
        .catch((error) => console.log(error)) 

    }

    useEffect(() => {
        
        profileLoad();
        console.log(route.params.idConsulta);
        
    }, [])

    useEffect(() => {
        
        GetInfoConsulta();
        
        
    }, [])

    useEffect(() => {
        if(uriCameraCapture){
            AlterarFotoPerfil()
        }
       
        
    }, [uriCameraCapture])
    const validateCampos = () => {
        let isValid = true;

        if (!descricao) {
            setDescricaoError('Descrição é obrigatória');
            isValid = false;
        } else {
            setDescricaoError('');
        }

        if (!diagnostico) {
            setDiagnosticoError('Diagnóstico é obrigatório');
            isValid = false;
        } else {
            setDiagnosticoError('');
        }

        if (!prescricao) {
            setPrescricaoError('Prescrição médica é obrigatória');
            isValid = false;
        } else {
            setPrescricaoError('');
        }

        return isValid;
    };

    const handleSubmit = () => {
        if (validateCampos()) {
            // Aqui você pode adicionar a lógica para salvar o registro médico
            console.log("Registro médico salvo com sucesso.");
        }
    };

    return (
        <Container>
           
               {open ? (<CameraModal
            setUriCameraCapture={setsetUriCameraCapture}
            getMediaLibrary={true}
            fecharModal={setOpen}
            // attPhotoProfile={ () => AlterarFotoPerfil() }
            />) : (<></>)} 
            <ScrollView>
            <ContainerImage>
            <ImgProfile source={{uri : uriCameraCapture}} />


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
            <Title> Chewie </Title>

            <ProfileData>
                <ContentTxt>6 anos</ContentTxt>
                <ContentTxt>chewie@email.com</ContentTxt>
            </ProfileData>

            <BoxInputMed>
                <TitleInput> Descrição da consulta </TitleInput>
                <BigInputInsert
                    placeholder="Descrição"
                    value={infoConsulta.descricao}
                    onChangeText={(txt) => setDescricao(txt)}
                    style={descricaoError ? { borderColor: 'red' } : {}}
                    editable={false}
                />
                {descricaoError && <Text style={{ color: 'red' }}>{descricaoError}</Text>}
            </BoxInputMed>
            
            <BoxInputMed>
                <TitleInput> Diagnóstico do paciente </TitleInput>
                <InputInsert
                    placeholder="Diagnóstico"
                    value={infoConsulta.diagnostico}
                    onChangeText={(txt) => setDiagnostico(txt)}
                    style={diagnosticoError ? { borderColor: 'red' } : {}}
                    editable={false}
                />
                {diagnosticoError && <Text style={{ color: 'red' }}>{diagnosticoError}</Text>}
            </BoxInputMed>
            
            <BoxInputMed>
                <TitleInput> Prescrição medica </TitleInput>
                <BigInputInsert
                    placeholder="Prescrição medica"
                    value={prescricao}
                    onChangeText={(txt) => setPrescricao(txt)}
                    style={prescricaoError ? { borderColor: 'red' } : {}}
                    editable={false}
                />
                {prescricaoError && <Text style={{ color: 'red' }}>{prescricaoError}</Text>}
            </BoxInputMed>

            {/* <Button onPress={() => InserirExame()}>
            <ButtonTxt> SALVAR </ButtonTxt>
            </Button>

            <LinkCancel>
                Cancelar
            </LinkCancel> */}
            </ScrollView>
        </Container>
        
    );
}

export default InsertMedRecord;
