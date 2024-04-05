import { useEffect, useState } from "react";
import { Container } from "../components/Container/Style";
import { ImgLocal } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow } from "../components/Input/Style";
import { LinkCancel } from "../components/Links/Style";
import { Subtitle, Title, TitleInput, TitleLocation } from "../components/Title/Style";
import api from "../Service/Service";
import Loader from "../components/Loader/Loader";
import { MapaConsulta } from "../components/MapaConsulta/MapaConsulta";


export const Location = ({ navigation, route }) => {

    const [clinica, setClinica] = useState(null);

    async function Listar() {
        await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaid}`)
            .then(response => setClinica(response.data))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (clinica == null) {
            Listar()
        }

    }, [clinica])



    return (

        <Container>

            {clinica != null 
            ? (<>
                <MapaConsulta />

                <TitleLocation> Clínica Natureh </TitleLocation>
                <Subtitle> São Paulo, SP </Subtitle>

                <BoxInput>
                    <TitleInput> Endereço </TitleInput>
                    <InputBlock>Rua Vicenso Silva, 987</InputBlock>
                </BoxInput>

                <DirectionRow>
                    <BoxInputRow>
                        <TitleInput> Número </TitleInput>
                        <InputBodyRow>578</InputBodyRow>
                    </BoxInputRow>

                    <BoxInputRow>
                        <TitleInput> Bairro </TitleInput>
                        <InputBodyRow>Moema-SP</InputBodyRow>
                    </BoxInputRow>
                </DirectionRow>

                <LinkCancel onPress={() => navigation.replace("Main")}>
                    Cancelar
                </LinkCancel></>)

                :

                (<Loader />)}

        </Container>
    );
}

export default Location;