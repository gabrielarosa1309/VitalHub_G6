import { useEffect, useState } from "react";
import { Container } from "../components/Container/Style";
import { DoctorCard } from "../components/DoctorCard/DoctorCard"
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { Title2 } from "../components/Title/Style";
import api from "../service/service";
import { ListComponent } from "../components/List/List";

export const SelectDoctor = ({ navigation }) => {

    const [medicoLista, setMedicoLista] = useState([])

    async function ListarMedicos() {
        await api.get('/Medicos').then( async response => { await setMedicoLista(response.data); console.log(response.data) }).catch(error => { alert("error")})
    }

    useEffect(() => {
        ListarMedicos()
    }, [])

    return (

        <Container>
            <Title2> Selecionar médico </Title2>

            <ListComponent
                data={medicoLista}
                key={(item) => item.id}
                renderItem={(medico) => (
                    <DoctorCard
                        doctorName={medico.idNavigation.nome}
                        doctorSpecialty={medico.especialidade.especialidade1}
                    />
                )}
            />

            <Button onPress={() => navigation.navigate("SelectDate")}>
                <ButtonTxt> CONTINUAR </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.navigate("SelectClinic")}>Cancelar</LinkCancel>

        </Container >
    );
}
export default SelectDoctor;