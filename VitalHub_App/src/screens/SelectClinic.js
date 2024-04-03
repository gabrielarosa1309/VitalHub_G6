import { useEffect, useState } from "react";
import { Container, ContainerScroll } from "../components/Container/Style"; import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { ListComponent } from "../components/List/List";

import { Title2 } from "../components/Title/Style";

import api from "../service/service";
import { ClinicCardSelect } from "../components/ClinicCardSelect/ClinicCardSelect";


export const SelectClinic = ({ navigation }) => {

    //State Listagem API Clinicas 
    const [clinicaLista, setClinicaLista] = useState([])

    //State para select de borda do card Medico
    const [selectClinic, setSelectClinic] = useState(false)

    //State para confirmar o id vindo da api para select do card Medico
    const [idConfirm, setIdConfirm] = useState()

    async function ListarClinicas() {

        try {
            const resApi = await api.get("/Clinica/ListarTodas")
            setClinicaLista(resApi.data)

        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {

        ListarClinicas()
    }, [])
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
                        onPress={() => { setSelectClinic(true); setIdConfirm(item.id) }}
                        index={idConfirm}
                        clinicId={item.id}
                    />
                )} />

            <Button onPress={() => navigation.navigate("SelectDoctor")}>
                <ButtonTxt> CONTINUAR </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.replace("Main")}>Cancelar</LinkCancel>

        </Container>
    );
}
export default SelectClinic;