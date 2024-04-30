import { Container } from "../components/Container/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { Title2 } from "../components/Title/Style";
import api from "../Service/Service";
import { ListComponent } from "../components/List/List";
import { DoctorCardSelect } from "../components/DoctorCardSelect/DoctorCardSelect";
import { useEffect, useState } from "react";

export const SelectDoctor = ({ navigation, route }) => {

    //State Listagem API Medicos
    const [medicoLista, setMedicoLista] = useState([])

    //State para select de borda do card Medico
    const [selectDoctor, setSelectDoctor] = useState(false)

    //State para confirmar o id vindo da api para select do card Medico
    const [idConfirm, setIdConfirm] = useState()

    const [medico, setMedico] = useState()

    async function ListarMedicos() {
        await api
            .get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
            .then((response) => { setMedicoLista(response.data), console.log(response.data); })
            .catch((error) => { console.log(error); })
    }

    function handleContinue() {
        navigation.replace("SelectDate", {
            agendamento:
            {
                ...route.params.agendamento,
                ...medico
            }
        });
    }

    useEffect(() => {
        ListarMedicos()
    }, [])

    useEffect(() => {
        console.log(route);
    }, [route])

    return (
        <Container>
            <Title2> Selecionar médico </Title2>

            <ListComponent
                data={medicoLista}
                key={(item) => item.id}
                renderItem={({ item }) => (

                    <DoctorCardSelect
                        name={item.idNavigation.nome}
                        especialidade={item.especialidade.especialidade1}
                        clickButton={selectDoctor}
                        onPress={() => { setMedicoLista({ medicoClinicaId: item.id, medicoLabel: item.idNavigation.nome }), setSelectDoctor(true); setIdConfirm(item.id) }}
                        index={idConfirm}
                        doctorId={item.id}
                    />
                )}

            />

            <Button onPress={() => handleContinue()}>
                <ButtonTxt> Continuar </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.replace("Main")}>Cancelar</LinkCancel>

        </Container>
    );
}
export default SelectDoctor;