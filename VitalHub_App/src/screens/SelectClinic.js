import { useEffect, useState } from "react";
import { Container, ContainerScroll } from "../components/Container/Style"; import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { ListComponent } from "../components/List/List";
import { SelectCard } from "../components/SelectCard/SelectCard";
import { Title2 } from "../components/Title/Style";
import { ClinicCard, ClinicCardSelect } from "../components/ClinicCard/ClinicCard";
import api from "../Service/Service";
import { DoctorCardSelect } from "../components/DoctorCardSelect/DoctorCardSelect";

export const SelectClinic = ({ navigation }) => {

    const [clinicaLista, setClinicaLista] = useState([])

    async function ListarClinicas(){

        try {
            const resApi = await api.get("/Clinica/ListarTodas")
            console.log("resposta clinica");
            console.log(resApi.data);

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
                renderItem={(item) => (

                    <ClinicCardSelect
                        nome={item.item.nomeFantasia}
                        
                    />
                )}

            />

                



               

            <Button onPress={() => navigation.navigate("SelectDoctor")}>
                <ButtonTxt> CONTINUAR </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.replace("Main")}>Cancelar</LinkCancel>

        </Container>
    );
}
export default SelectClinic;