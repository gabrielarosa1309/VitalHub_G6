import { Container } from "../components/Container/Style";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { Title2 } from "../components/Title/Style";
import api from "../service/service";
import { ListComponent } from "../components/List/List";
import { DoctorCardSelect } from "../components/DoctorCardSelect/DoctorCardSelect";
import { useEffect, useState } from "react";

export const SelectDoctor = ({ navigation }) => {

    //State Listagem API Medicos
    const [medicoLista, setMedicoLista] = useState([])

    //State para select de borda do card Medico
    const [selectDoctor, setSelectDoctor] = useState(false)

    //State para confirmar o id vindo da api para select do card Medico
    const [idConfirm, setIdConfirm] = useState()

    async function ListarMedicos() {
        try {
            const resApi = await api.get("/Medicos")
            setMedicoLista(resApi.data)

        } catch (error) {
            console.log(error);
        }
     
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
                renderItem={(item) => (

                    <DoctorCardSelect
                        name={item.item.idNavigation.nome}
                        especialidade={item.item.especialidade.especialidade1}
                        clickButton={selectDoctor}
                        onPress={() => {setSelectDoctor(true); setIdConfirm(item.item.id)}}
                        index={idConfirm}
                        doctorId={item.item.id}
                    />
                )}

            />

            <Button onPress={() => navigation.navigate("SelectDate")}>
                <ButtonTxt> CONTINUAR </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.navigate("SelectClinic")}>Cancelar</LinkCancel>

        </Container>
    );
}
export default SelectDoctor;