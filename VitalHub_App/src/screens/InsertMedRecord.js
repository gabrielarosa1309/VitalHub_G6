import React, { useEffect, useState } from 'react';
import { ProfileData } from "../components/AppointmentCard/Style";
import { Container, ContainerImage, Scroll } from "../components/Container/Style";
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


export const InsertMedRecord = ({navigation, route, editProp}) => {
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
    const [editPatient, setEditPatient] = useState(false)
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
        
        setInfoConsulta(infoConsulta.data)
        setDescricao(infoConsulta.data.descricao)
        setDiagnostico(infoConsulta.data.diagnostico)
        setPrescricao(infoConsulta.data.receita.medicamento)

    
      
        
    }

    async function AlterarFotoPerfil() {
        const formData = new FormData();
        formData.append("Arquivo",
            {
                uri: uriCameraCapture,
                name: `image.${uriCameraCapture.split(".")[1]}`,
                type: `image/${uriCameraCapture.split(".")[1]}`
            })

        

        await api.put(`/Usuario/AlterarFotoPerfil?id=${userData.user}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => {setUserData({ ...userData, foto: uriCameraCapture }) })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        profileLoad();
        
        
    }, [])

    useEffect(() => {
        
        GetInfoConsulta();
        
        
    }, [])

    useEffect(() => {
        if (uriCameraCapture) {
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

    async function handleSubmit() {
       const res = await api.put(`Consultas/Prontuario`, {

        consultaId: route.params.idConsulta,
        medicamento: prescricao,
       descricao: descricao,
       diagnostico: diagnostico})

       if (infoConsulta.situacao.situacao === "Pendentes") {
        await api.put(`/Consultas/Status?idConsulta=${route.params.idConsulta}&status=Realizados`)
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
            <Scroll>
           

            <Title> Chewie </Title>

            <ProfileData>
                <ContentTxt>6 anos</ContentTxt>
                <ContentTxt>chewie@email.com</ContentTxt>
            </ProfileData>

            <BoxInputMed>
                <TitleInput> Descrição da consulta </TitleInput>
                <BigInputInsert
                    placeholder="Descrição"
                    placeholderTextColor={editPatient ?  '#34898F' : '#33303E'}
                    value={descricao}
                    onChangeText={(txt) => setDescricao(txt)}
                    style={editPatient ? {color: '#34898F', borderStyle: 'solid' , borderWidth: 2, borderColor: '#49B3BA' , backgroundColor: "white", } : {color: '#33303E', backgroundColor: "#F5F3F3", borderStyle: 'solid' , borderWidth: 2, borderColor: '#D9D9D9'}}
                    editable={editPatient == true ? true : false}
                    
                />
                {descricaoError && <Text style={{ color: 'red' }}>{descricaoError}</Text>}
            </BoxInputMed>
            
            <BoxInputMed>
                <TitleInput> Diagnóstico do paciente </TitleInput>
                <InputInsert
                    placeholder="Diagnóstico"
                    placeholderTextColor={editPatient ?  '#34898F' : '#33303E'}
                    value={diagnostico}
                    onChangeText={(txt) => setDiagnostico(txt)}
                    style={editPatient ? {color: '#34898F', borderStyle: 'solid' , borderWidth: 2, borderColor: '#49B3BA' , backgroundColor: "white", } : {color: '#33303E', backgroundColor: "#F5F3F3", borderStyle: 'solid' , borderWidth: 2, borderColor: '#F5F3F3'}}
                    editable={editPatient == true ? true : false}
                />
                {diagnosticoError && <Text style={{ color: 'red' }}>{diagnosticoError}</Text>}
            </BoxInputMed>
            
            <BoxInputMed>
                <TitleInput> Prescrição medica </TitleInput>
                <BigInputInsert
                    placeholder="Prescrição medica"
                    placeholderTextColor={editPatient ?  '#34898F' : '#33303E'}
                    value={prescricao}
                    onChangeText={(txt) => setPrescricao(txt)}
                    style={editPatient ? {color: '#34898F', borderStyle: 'solid' , borderWidth: 2, borderColor: '#49B3BA' , backgroundColor: "white", } : {color: '#33303E', backgroundColor: "#F5F3F3", borderStyle: 'solid' , borderWidth: 2, borderColor: '#F5F3F3'}}
                    editable={editPatient == true ? true : false}
                />
                {prescricaoError && <Text style={{ color: 'red' }}>{prescricaoError}</Text>}
            </BoxInputMed>
{userData.role == "Medico" ? (<>   

                <Button 
                    disabled={editPatient ? false : true}
                    onPress={() =>{ setEditPatient(false), handleSubmit()}}>
                    <ButtonTxt> Salvar </ButtonTxt>
                </Button>
                <Button 
                disabled={editPatient ? true : false}
                style={editPatient ? {backgroundColor: '#ACABB7'} : {backgroundColor:  '#496BBA'} }
                onPress={() => setEditPatient(true) }>
                    <ButtonTxt> EDITAR </ButtonTxt>
                </Button>
                
                </>) : null}
         
            </Scroll>
        </Container>
    );
}

export default InsertMedRecord;
