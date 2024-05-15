import { useEffect, useState } from "react";
import { Container, ContainerImage, ContainerScroll } from "../components/Container/Style";
import { Button, ButtonCamera, ButtonTxt } from "../components/EntryButton/Style";
import { ImgProfile } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow, InputInsert } from "../components/Input/Style";
import { Subtitle, Title, TitleInput } from "../components/Title/Style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDecodeToken } from "../utils/auth/auth";
import CameraModal from "../components/CameraModal/CameraModal";
import api from "../Service/Service";
import moment from "moment";
import { Masks, useMaskedInputProps } from 'react-native-mask-input';

export const Profile = ({ navigation }) => {
    const [openModal, setOpenModal] = useState(false)
    const [userData, setUserData] = useState({})
    const [profileData, setProfileData] = useState(null)
    const [uriCameraCapture, setsetUriCameraCapture] = useState(null) // Traz da camera o caminho da imagem por meio da funcao de capturar a foto
    const [open, setOpen] = useState(false)
    const [edicao, setEdicao] = useState(false);

    // States pra edição do usuário
    const [dataNasc, setDataNasc] = useState("");
    const [cpf, setCpf] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [crm, setCrm] = useState("");



    // Função que carrega o perfil do usuário
    async function profileLoad() {
        const data = await userDecodeToken();
        if (data) {
            setUserData(data)
            getProfile(data)
        }
    }

    // Função que desloga o usuário
    async function LogOut() {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }

    // Função para pegar os dados do usuário
    async function getProfile(token) {
        const url = (token.role == 'Medico' ? "Medicos" : "Pacientes")

        await api.get(`/${url}/BuscarPorId?id=${token.user}`)
            .then(response => {
                setProfileData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // Função que altera os dados do usuário
    async function handleSave(token) {
        let updatedData;
        if (token.role === 'Medico') {
            updatedData = {
                especialidade: especialidade,
                crm: crm,
                endereco: {
                    logradouro: endereco,
                    cep: cep,
                    cidade: cidade
                },
            };
        } else {
            updatedData = {
                dataNascimento: dataNasc,
                cpf: cpf,
                endereco: {
                    logradouro: endereco,
                    cep: cep,
                    cidade: cidade
                },
            };
        }

        const url = (token.role == 'Medico' ? "Medicos" : "Pacientes")

        await api.put(`/${url}?idUsuario=${userData.user}`, updatedData)
            .then((response) => {
                console.log(response.status);
                setProfileData({ ...profileData, ...updatedData });
                setEdicao(false);
            })
            .catch((error) => console.log(error));
    }

    // Função que altera a foto de perfil do usuário
    async function AlterarFotoPerfil() {
        const formData = new FormData();

        formData.append("Arquivo",
            {
                uri: uriCameraCapture,
                name: `image.${uriCameraCapture.split(".")[1]}`,
                type: `image/${uriCameraCapture.split(".")[1]}`
            })

        await api.put(`/Usuario/AlterarFotoPerfil?id=${userData.user}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => { console.log(response.status); setUserData({ ...userData, foto: uriCameraCapture }) })
            .catch((error) => console.log(error))
    }

    // Troca os inputs pro modo de editar
    const handleEdit = () => {
        setEdicao(true);
    };

    const dataMasked = useMaskedInputProps({
        value: dataNasc,
        onChangeText: setDataNasc,
        mask: Masks.DATE_DDMMYYYY
    });

    // Effects
    useEffect(() => {
        profileLoad();
    }, [])

    useEffect(() => {
        if (edicao) {
            setDataNasc(profileData.dataNascimento);
            setCpf(profileData.cpf);
            setEndereco(profileData.endereco.logradouro);
            setCep(profileData.endereco.cep);
            setCidade(profileData.endereco.cidade);
        }
    }, [edicao, profileData]);


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
            />) : (<></>)}

            {
                profileData != null
                    ?
                    (
                        <>
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

                            {userData.role == "Paciente" ?
                                (
                                    <>
                                        <ContainerScroll>

                                            {/* Data de nascimento */}
                                            <BoxInput>
                                                <TitleInput> Data de nascimento </TitleInput>

                                                {edicao ? (
                                                    <InputInsert
                                                        {...dataMasked}
                                                        keyboardType="numeric"
                                                        placeholder="Insira sua data de nascimento"
                                                    />
                                                ) : (
                                                    <InputBlock>
                                                        {dataNasc}
                                                    </InputBlock>
                                                )}
                                            </BoxInput>

                                            {/* CPF */}
                                            <BoxInput>
                                                <TitleInput> CPF </TitleInput>

                                                {edicao ? (
                                                    <InputInsert
                                                        placeholder="Insira o CPF"
                                                        value={cpf}
                                                        onChangeText={setCpf}
                                                    />
                                                ) : (
                                                    <InputBlock>
                                                        {profileData.cpf}
                                                    </InputBlock>
                                                )}
                                            </BoxInput>

                                            {/* Endereço */}
                                            <BoxInput>
                                                <TitleInput> Endereço </TitleInput>

                                                {edicao ? (
                                                    <InputInsert
                                                        placeholder="Insira o endereço"
                                                        value={endereco}
                                                        onChangeText={setEndereco}
                                                    />
                                                ) : (
                                                    <InputBlock>
                                                        {profileData.endereco.logradouro}
                                                    </InputBlock>
                                                )}
                                            </BoxInput>

                                            {/* CEP e cidade */}
                                            <DirectionRow>
                                                {/* Cep */}
                                                <BoxInputRow>
                                                    <TitleInput> Cep </TitleInput>

                                                    {edicao ? (
                                                        <InputInsert
                                                            placeholder="Insira o CEP"
                                                            value={cep}
                                                            onChangeText={setCep}
                                                        />
                                                    ) : (
                                                        <InputBodyRow>
                                                            {profileData.endereco.cep}
                                                        </InputBodyRow>
                                                    )}
                                                </BoxInputRow>

                                                {/* Cidade */}
                                                <BoxInputRow>
                                                    <TitleInput> Cidade </TitleInput>

                                                    {edicao ? (
                                                        <InputInsert
                                                            placeholder="Insira a cidade"
                                                            value={cidade}
                                                            onChangeText={setCidade}
                                                        />
                                                    ) : (
                                                        <InputBodyRow>
                                                            {profileData.endereco.cidade}
                                                        </InputBodyRow>
                                                    )}
                                                </BoxInputRow>
                                            </DirectionRow>

                                            <Button onPress={edicao ? handleSave : handleEdit}>
                                                <ButtonTxt>{edicao ? 'Salvar' : 'Editar'}</ButtonTxt>
                                            </Button>

                                            <Button onPress={() => LogOut()}>
                                                <ButtonTxt> Sair </ButtonTxt>
                                            </Button>

                                            {openModal ? (<CameraModal getMediaLibrary={true} />) : (<></>)}

                                        </ContainerScroll>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <ContainerScroll>

                                            {/* Especialidade */}
                                            <BoxInput>
                                                <TitleInput> Especialidade </TitleInput>

                                                {edicao ? (
                                                    <InputInsert
                                                        placeholder="Insira a especialidade"
                                                        value={especialidade}
                                                        onChangeText={setEspecialidade}
                                                    />
                                                ) : (
                                                    <InputBlock>
                                                        {profileData.crm}
                                                    </InputBlock>
                                                )}
                                            </BoxInput>

                                            {/* CRM */}
                                            <BoxInput>
                                                <TitleInput> CRM </TitleInput>

                                                {edicao ? (
                                                    <InputInsert
                                                        placeholder="Insira o CRM"
                                                        value={crm}
                                                        onChangeText={setCrm}
                                                    />
                                                ) : (
                                                    <InputBlock>
                                                        {profileData.crm}
                                                    </InputBlock>
                                                )}
                                            </BoxInput>

                                            {/* Endereço */}
                                            <BoxInput>
                                                <TitleInput> Endereço </TitleInput>

                                                {edicao ? (
                                                    <InputInsert
                                                        placeholder="Insira o endereço"
                                                        value={endereco}
                                                        onChangeText={setEndereco}
                                                    />
                                                ) : (
                                                    <InputBlock>
                                                        {profileData.endereco.logradouro}
                                                    </InputBlock>
                                                )}
                                            </BoxInput>

                                            {/* CEP e cidade */}
                                            <DirectionRow>
                                                {/* Cep */}
                                                <BoxInputRow>
                                                    <TitleInput> Cep </TitleInput>

                                                    {edicao ? (
                                                        <InputInsert
                                                            placeholder="Insira o CEP"
                                                            value={cep}
                                                            onChangeText={setCep}
                                                        />
                                                    ) : (
                                                        <InputBodyRow>
                                                            {profileData.endereco.cep}
                                                        </InputBodyRow>
                                                    )}
                                                </BoxInputRow>

                                                {/* Cidade */}
                                                <BoxInputRow>
                                                    <TitleInput> Cidade </TitleInput>

                                                    {edicao ? (
                                                        <InputInsert
                                                            placeholder="Insira a cidade"
                                                            value={cidade}
                                                            onChangeText={setCidade}
                                                        />
                                                    ) : (
                                                        <InputBodyRow>
                                                            {profileData.endereco.cidade}
                                                        </InputBodyRow>
                                                    )}
                                                </BoxInputRow>
                                            </DirectionRow>

                                            <Button onPress={edicao ? handleSave : handleEdit}>
                                                <ButtonTxt>{edicao ? 'Salvar' : 'Editar'}</ButtonTxt>
                                            </Button>

                                            <Button onPress={() => LogOut()}>
                                                <ButtonTxt> Sair </ButtonTxt>
                                            </Button>

                                            {openModal ? (<CameraModal getMediaLibrary={true} />) : (<></>)}

                                        </ContainerScroll>
                                    </>
                                )
                            }
                        </>
                    )
                    :
                    null
            }
        </Container >
    );
}

export default Profile;