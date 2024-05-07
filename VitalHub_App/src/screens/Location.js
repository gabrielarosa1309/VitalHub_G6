import { useEffect, useState } from "react";
import { Container } from "../components/Container/Style";
import { ImgLocal } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow } from "../components/Input/Style";
import { LinkCancel } from "../components/Links/Style";
import { Map } from "../components/Map/Map";
import { Subtitle, Title, TitleInput, TitleLocation } from "../components/Title/Style";
import { ActivityIndicator } from "react-native";
import api from "../Service/Service";

export const Location = ({ navigation, route }) => {
    const [clinica, setClinica] = useState(null);

    useEffect(() => {
        if (clinica == null) {
            BuscarClinica()
        }
    }, [clinica])

    async function BuscarClinica() {
        var response =await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaid}`)
            .then(response => {
                setClinica(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <Container>
            {
                clinica != null ? (
                    <>
                        <Map 
                            longitude={clinica.endereco.longitude}
                            latitude={clinica.endereco.latitude}
                        />

                        <TitleLocation> {clinica.nomeFantasia} </TitleLocation>
                        <Subtitle> {clinica.endereco.cidade}, {clinica.endereco.estado}</Subtitle>

                        <BoxInput>
                            <TitleInput> Endereço </TitleInput>
                            <InputBlock> {clinica.endereco.logradouro} </InputBlock>
                        </BoxInput>

                        <DirectionRow>
                            <BoxInputRow>
                                <TitleInput> Número </TitleInput>
                                <InputBodyRow> {clinica.endereco.numero} </InputBodyRow>
                            </BoxInputRow>

                            <BoxInputRow>
                                <TitleInput> Bairro </TitleInput>
                                <InputBodyRow>{clinica.endereco.bairro}</InputBodyRow>
                            </BoxInputRow>
                        </DirectionRow>

                        <LinkCancel onPress={() => navigation.replace("Main")}>
                            Cancelar
                        </LinkCancel>
                    </>
                ) : (
                    <ActivityIndicator />
                )
            }
        </Container>
    );
}

export default Location;