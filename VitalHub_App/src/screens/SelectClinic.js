import { useEffect, useState } from "react";
import { Container, ContainerScroll } from "../components/Container/Style"; import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { ListComponent } from "../components/List/List";

import { Title2 } from "../components/Title/Style";

import api from "../Service/Service";
import { ClinicCardSelect } from "../components/ClinicCardSelect/ClinicCardSelect";


export const SelectClinic = ({ navigation, route }) => {

    //State Listagem API Clinicas 
    const [clinicaLista, setClinicaLista] = useState()

    //State para select de borda do card Medico
    const [selectClinic, setSelectClinic] = useState(false)

    //State para confirmar o id vindo da api para select do card Medico
    const [idConfirm, setIdConfirm] = useState()

    const [clinica, setClinica] = useState()

    async function ListarClinicas() {
        await api
            .get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`)
            .then((response) => { setClinicaLista(response.data), console.log(response.data); })
            .catch((error) => { console.log(error); })
    }

    function handleContinue() {
        navigation.replace("SelectDoctor", {
            agendamento:
            {
                ...route.params.agendamento,
                ...clinica
            }
        });
    }

    useEffect(() => {
        ListarClinicas()
    }, [])

    useEffect(() => {
        console.log(route);
    }, [route])

    return (
        <Container>
            <Title2> Selecionar clínica </Title2>

            <ListComponent
                data={clinicaLista}
                key={(item) => item.id}
                renderItem={({ item }) => (
                    <ClinicCardSelect
                        name={item.nomeFantasia}
                        adress={item.endereco.logradouro}
                        rate={"5"}
                        disponibility={"Seg-Sex"}
                        clickButton={selectClinic}
                        onPress={() => { setClinica({ clinicaId: item.id, clinicaLabel: item.nomeFantasia }); setSelectClinic(true); setIdConfirm(item.id) }}
                        index={idConfirm}
                        clinicId={item.id}
                        route={item.id}
                    />
                )} />

            <Button onPress={() => handleContinue()}>
                <ButtonTxt> Continuar </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.replace("Main")}>Cancelar</LinkCancel>

        </Container>
    );
}
export default SelectClinic;