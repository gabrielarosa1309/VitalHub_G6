import React, { useEffect, useState } from 'react';
import { ScrollViewBase, View } from "react-native";
import { ProfileData } from "../components/AppointmentCard/Style";
import { Container } from "../components/Container/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { ContentTxt } from "../components/MedRecordModal/Style";
import { Title, TitleInput } from "../components/Title/Style";
import { BigInputInsert, BoxInput, BoxInputMed, InputInsert } from "../components/Input/Style";
import { Button, ButtonCamera, ButtonTxt, ContainerImage } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { Text } from "react-native";
import CameraModal from '../components/CameraModal/CameraModal';
import { userDecodeToken } from '../utils/Auth';
import { ScrollView } from 'react-native-web';

export const InsertMedRecord = () => {
    const [descricao, setDescricao] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [prescricao, setPrescricao] = useState('');
    const [descricaoError, setDescricaoError] = useState('');
    const [diagnosticoError, setDiagnosticoError] = useState('');
    const [prescricaoError, setPrescricaoError] = useState('');
    const [userData, setUserData] = useState({});
    const [open, setOpen] = useState(false);
    const [uriCameraCapture, setsetUriCameraCapture] = useState(null) //Traz da camera o caminho da imagem por meio da funcao de capturar a foto

    async function profileLoad() {
        const data = await userDecodeToken();
        setUserData(data)
    }


    async function InserirExame() {
        
        const formData = new FormData();
       
        //FALTOU COLOCAR O ID DO PRONTUARIO AQUI COM FORM.APPEND PUXANDO O ID DA API COM UM GET E TESTAR ESTA FUNCAO
      formData.append("Arquivo", 
        {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split(".").pop()}`,
            type: `image/${uriCameraCapture.split(".").pop()}`
        })

       console.log("form data"); 
console.log(formData);

        await api.put(`/Exame/Cadastrar`, formData, { headers: {"Content-Type" : "multipart/form-data"}})
        .then((response) => {setDescricao( descricao + "\n" + response.data.descricao); setUserData({ ...userData, foto : uriCameraCapture})})
        .catch((error) => console.log(error)) 

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
            
            <ContainerImage>
            <ImgProfile source={{uri : uriCameraCapture}} />


            <ButtonCamera
            onPress={() => {setOpen(true)}}
            ></ButtonCamera>

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
                    value={descricao}
                    onChangeText={(txt) => setDescricao(txt)}
                    style={descricaoError ? { borderColor: 'red' } : {}}
                />
                {descricaoError && <Text style={{ color: 'red' }}>{descricaoError}</Text>}
            </BoxInputMed>
            <Button onPress={() => InserirExame()}>
                <ButtonTxt> SALVAR </ButtonTxt>
            </Button>
            <BoxInputMed>
                <TitleInput> Diagnóstico do paciente </TitleInput>
                <InputInsert
                    placeholder="Diagnóstico"
                    value={diagnostico}
                    onChangeText={(txt) => setDiagnostico(txt)}
                    style={diagnosticoError ? { borderColor: 'red' } : {}}
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
                />
                {prescricaoError && <Text style={{ color: 'red' }}>{prescricaoError}</Text>}
            </BoxInputMed>

      

            <LinkCancel>
                Cancelar
            </LinkCancel>
            
        </Container>
        
    );
}

export default InsertMedRecord;
