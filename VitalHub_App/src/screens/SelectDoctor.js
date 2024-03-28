import { useEffect, useState } from "react";
import { Container } from "../components/Container/Style";
import { DoctorCard } from "../components/DoctorCard/DoctorCard"
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { Title2 } from "../components/Title/Style";
import api from "../Service/Service";
import { ListComponent } from "../components/List/List";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { DoctorCardSelect } from "../components/DoctorCardSelect/DoctorCardSelect";

export const SelectDoctor = ({ navigation }) => {

    const [teste, setTeste] = useState({})
    const [medicoLista, setMedicoLista] = useState([])

    //State para select de borda do card Medico
    const [selectDoctor, setSelectDoctor] = useState(false)

    //State para confirmar o id vindo da api para select do card Medico
    const [idConfirm, setIdConfirm] = useState()

    async function ListarMedicos() {


        try {
            const resApi = await api.get("/Medicos")

            console.log("resposta da requisicao::::::::::::::");
            console.log(resApi);
            console.log("dados da requisicao::::::::::::::");
            console.log(resApi.data);

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
                        nome={item.item.idNavigation.nome}
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