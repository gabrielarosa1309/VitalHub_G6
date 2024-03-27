import { useEffect, useState } from "react";
import { Container } from "../components/Container/Style";
import { DoctorCard } from "../components/DoctorCard/DoctorCard"
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { Title2 } from "../components/Title/Style";
import api from "../service/service";
import { ListComponent } from "../components/List/List";

export const SelectDoctor = ({ navigation }) => {
    const [medicosLista, setMedicosLista] = useState([]);

    async function ListarMedicos(){
        await api.get('/Medicos')
            .then(response => {
                setMedicosLista(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        ListarMedicos();
    }, [])

    return (
        <Container>
            <Title2> Selecionar médico </Title2>

            <ListComponent
                data={medicosLista}
                keyExtractor={(item) => item.id}
                renderItem={(medico) => (
                    <DoctorCard medico={medico.item}/>
                )}
                showsVerticalScrollIndicator={false}
            />

            <Button onPress={() => navigation.navigate("SelectDate")}>
                <ButtonTxt> CONTINUAR </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.navigate("SelectClinic")}>Cancelar</LinkCancel>

        </Container>
    );
}
export default SelectDoctor;