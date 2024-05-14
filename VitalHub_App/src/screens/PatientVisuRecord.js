import { View } from "react-native";
import { ContainerScroll, ContainerUser } from "../components/Container/Style";
import { ButtonVisu, ButtonVisuTxt, RowButtonVisu } from "../components/EntryButton/Style";
import { BoxInput, InpBlockImgTxt, InputBlock, InputBlockImg } from "../components/Input/Style";
import { LinkCancel, RedLinkCancel } from "../components/Links/Style";
import { ContentTxt } from "../components/MedRecordModal/Style";
import { ProfileData } from "../components/PatientAppCard/Style";
import { Title, TitleInput } from "../components/Title/Style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ImgProfile } from "../components/ImgProfile/Style";
import { useEffect, useState } from "react";
import CameraModal from "../components/CameraModal/CameraModal";
import api from "../Service/Service";
import { userDecodeToken } from "../utils/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PatientVisuRecord = ({ navigation, route }) => {


    const [openModal, setOpenModal] = useState(false)
    const [uriCameraCapture, setsetUriCameraCapture] = useState(null) //Traz da camera o caminho da imagem por meio da funcao de capturar a foto
    const [foto, setFoto] = useState();
    const [infoConsulta, setInfoConsulta] = useState([])
    const [userData, setUserData] = useState({});
    const [medicamento, setMedicamento] = useState('');
    const [descricao, setDescricao] = useState('');
 
    async function GetInfoConsulta() {

        const token = JSON.parse( await AsyncStorage.getItem("token") ).token //o .token Serve para desencapsular o token do json 
      
        const infoConsulta = await api.get(`/Consultas/BuscarPorId?id=${route.params.idConsulta}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
          }) 
        setInfoConsulta(infoConsulta.data)
        console.log(infoConsulta);
          setMedicamento(infoConsulta.data.receita.medicamento)
        
    }

    // async function OcrPost() {

    //     const formData = new FormData();

    //       formData.append("Image", 
    //         {
    //             uri: uriCameraCapture,
    //             name: `image.${uriCameraCapture.split(".")[1]}`,
    //             type: `image/${uriCameraCapture.split(".")[1]}`
    //         })
    // console.log(uriCameraCapture);

    // await api.post(`/Ocr`, formData, { headers: {"Content-Type" : "multipart/form-data"}})
    // .then((response) => {console.log(response.status); setFoto({foto: uriCameraCapture})})
    // .catch((error) => console.log(error)) 

    // }
    async function profileLoad() {
        const data = await userDecodeToken();
        setUserData(data)
    }

    async function InserirExame() {
       
        const formData = new FormData();

        formData.append("ConsultaId", route.params.idConsulta)

        formData.append("Imagem",
            {
                uri: uriCameraCapture,
                name: `image.${uriCameraCapture.split(".").pop()}`,
                type: `image/${uriCameraCapture.split(".").pop()}`
            })
     

   

        await api.post(`/Exame/Cadastrar`, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => { console.log(response.status), setDescricao(descricao + "\n" + response.data.descricao); setUserData({ ...userData, foto: uriCameraCapture }) })
            .catch((error) => console.log(error))

    }

    useEffect(() => {
        
        GetInfoConsulta();
        
        
    }, [])

    useEffect(() => {

        if (uriCameraCapture != null) {
            InserirExame()
        }


    }, [uriCameraCapture])

    useEffect(() => {

        profileLoad();


    }, [])


    return (
        <ContainerScroll>
            <ContainerUser>

                <ImgProfile source={{ uri: uriCameraCapture }} />

                <Title> Dr. Claudio </Title>

                <ProfileData>
                    <ContentTxt>Clínico geral</ContentTxt>
                    <ContentTxt>CRM-15286</ContentTxt>
                </ProfileData>
                <ContainerScroll>
                    <BoxInput>
                        <TitleInput> Descrição da consulta </TitleInput>
                        <InputBlock>{infoConsulta.descricao}</InputBlock>
                    </BoxInput>

                    <BoxInput>
                        <TitleInput> Diagnóstico do paciente </TitleInput>
                        <InputBlock>{infoConsulta.diagnostico}</InputBlock>
                    </BoxInput>

                    <BoxInput>
                        <TitleInput> Prescrição medica </TitleInput>
                        <InputBlock> {medicamento} </InputBlock>
                    </BoxInput>

                    <BoxInput>
                        <TitleInput> Exames médicos </TitleInput>

                        {uriCameraCapture == null ?
                            (<>
                                <InputBlockImg>
                                    <MaterialCommunityIcons
                                        name="file-alert-outline"
                                        size={18}
                                        color="#33303E"
                                    />
                                    <InpBlockImgTxt>Nenhuma foto informada</InpBlockImgTxt>
                                </InputBlockImg>
                            </>)
                            :
                            (<InputBlockImg><InpBlockImgTxt>{descricao}</InpBlockImgTxt></InputBlockImg>)}


                    </BoxInput>

                    <RowButtonVisu>
                        <View style={{ width: "50%" }}>
                            <ButtonVisu onPress={() => { setOpenModal(true) }}>
                                <MaterialIcons
                                    name="add-photo-alternate"
                                    size={20}
                                    color="white"
                                />
                                <ButtonVisuTxt>Enviar</ButtonVisuTxt>
                            </ButtonVisu>

                        </View>

                        <View style={{ width: "50%", alignContent: "center", justifyContent: "center" }}>
                            <RedLinkCancel> Cancelar </RedLinkCancel>
                        </View>
                    </RowButtonVisu>

                    <BoxInput>
                        <TitleInput> Resultado de análises clínicas </TitleInput>
                        <InputBlock> Sangue: tudo normal </InputBlock>
                    </BoxInput>
                </ContainerScroll>

                <LinkCancel onPress={() => navigation.replace("Main")}>
                    Voltar
                </LinkCancel>
            </ContainerUser>

            {/* Alteração que fez funcionar o modal */}
            {openModal ? (<CameraModal
                setUriCameraCapture={setsetUriCameraCapture}
                getMediaLibrary={true}
                fecharModal={setOpenModal}

            />

            )
                :
                (<></>)}
        </ContainerScroll>
    );
}

export default PatientVisuRecord;