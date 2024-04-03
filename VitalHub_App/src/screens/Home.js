import CalendarList from "../components/Calendar/Calendar";
import { Container } from "../components/Container/Style";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { HomeButton } from "../components/HomeButton/HomeButton";
import { ButtonRowHome } from "../components/HomeButton/Style";
import { ListComponent } from "../components/List/List";
import CancelModal from "../components/CancelModal/CancelModal";
import AppointmentModal from "../components/AppointmentModal/AppointmentModal";
import AppointmentButton from "../components/AppointmentButton/AppointmentButton";
import { PatientAppCard } from "../components/PatientAppCard/PatientAppCard";
import MedModal from "../components/MedModal/MedModal";
import { userDecodeToken } from "../utils/auth/auth";
import api from "../Service/Service";

export const Home = ({ navigation }) => {

    //Listagem Api Consultas
    const [listaConsultas, setListaConsultas] = useState([])

    async function ListarConsultas() {

        try {
            const resApi = await api.get("/Consultas")
         

        setListaConsultas(resApi.data)

        } catch (error) {
            console.log(error);
        }
       
    }


useEffect(() => {

ListarConsultas()

}, [])

    async function profileLoad() {
        
        const token = await userDecodeToken()
        

       setInfo(token)
    }


    const [info, setInfo] = useState({})

    const [statusLista, setStatusLista] = useState("pendente");

    const [showMedModal, setShowMedModal] = useState(false);
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalApp, setShowModalApp] = useState(false);

    useEffect(() => {

        profileLoad();
    }, [])

    return (
        <Container>

            <Header
                img={require("../assets/img/chewie.jpg")}
                name={info.name}
                navigation={navigation}
            />

            <CalendarList />

            <ButtonRowHome>

                <HomeButton
                    textButton={"Agendadas"}
                    clickButton={statusLista === "pendente"}
                    onPress={() => setStatusLista("pendente")}
                />

                <HomeButton
                    textButton={"Realizadas"}
                    clickButton={statusLista === "realizado"}
                    onPress={() => setStatusLista("realizado")}
                />


                <HomeButton
                    textButton={"Canceladas"}
                    clickButton={statusLista === "cancelado"}
                    onPress={() => setStatusLista("cancelado")}
                />


            </ButtonRowHome>

            <ListComponent
                data={listaConsultas}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) =>
                    statusLista == item.situacao && (
                        <PatientAppCard
                            situacao={item.situacao}
                            onPressMedModal={() => setShowMedModal(true)}
                            onPressCancel={() => setShowModalCancel(true)}
                            navigation={navigation}
                        />
                    )
                }
            />

            <AppointmentButton onPress={() => setShowModalApp(true)} />

            <CancelModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />

            <MedModal
                visible={showMedModal}
                setShowMedModal={setShowMedModal}
                navigation={navigation}
            />

            <AppointmentModal
                visible={showModalApp}
                setShowModalApp={setShowModalApp}
                navigation={navigation}
            />

        </Container>
    );
}
export default Home;