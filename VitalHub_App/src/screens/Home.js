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
import moment from "moment";
import api from "../Service/Service";

export const Home = ({ navigation }) => {
    const [profile, setProfile] = useState({})
    const [info, setInfo] = useState({})
    const [statusLista, setStatusLista] = useState('');
    const [showMedModal, setShowMedModal] = useState(false);
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalApp, setShowModalApp] = useState(false);
    const [dataConsulta, setDataConsulta] = useState('');
    const [consultas, setConsultas] = useState([]);
    const [time, setTime] = useState('');
    const [consultaSelecionada, setConsultaSelecionada] = useState('');

    //State para armazenar informacoes dos cards para atualizar os status
    const [putId, setPutId] = useState("");

    async function profileLoad() {
        const token = await userDecodeToken();
        if (token) {
            setProfile(token)
            setInfo(token)
            setDataConsulta(moment().format("YYYY-MM-DD"))
        }
    }

    async function ListarConsultas() {
        const url = (profile.role == 'Medico' ? "Medicos" : "Pacientes")

        await api.get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${profile.user}`)
            .then(response => {
                setConsultas(response.data);
                
            }).catch(error => {
                console.log(error);
            })
    }

    async function CancelConsult() {
        await api.put(`/Consultas/Status?idConsulta=${putId}&status=Cancelados`)
            .then(response => {
                if (response.status == 200) {
                    setShowModalCancel(false)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {

    profileLoad(); 
        
       
    
        
    }, [])

    useEffect(() => {
        if (dataConsulta != '') {
            ListarConsultas();
        }
    }, [dataConsulta, showModalCancel])

    function MostrarModal(modal, consulta) {
        if (profile.role == "Paciente") {
            setConsultaSelecionada(consulta)
        }
        

        if (modal == 'cancelar') {
            setShowModalCancel(true)
        } else {
            setShowMedModal(true)
        }
    }

    return (
        <Container>
            <Header
                img={require("../assets/img/chewie.jpg")}
                name={info.name}
                navigation={navigation}
            />

            <CalendarList
                setDataConsulta={setDataConsulta}
            />

            <ButtonRowHome>
                <HomeButton
                    textButton={"Agendadas"}
                    clickButton={statusLista === "Pendentes"}
                    onPress={() => setStatusLista("Pendentes")}
                />

                <HomeButton
                    textButton={"Realizadas"}
                    clickButton={statusLista === "Realizados"}
                    onPress={() => setStatusLista("Realizados")}
                />


                <HomeButton
                    textButton={"Canceladas"}
                    clickButton={statusLista === "Cancelados"}
                    onPress={() => setStatusLista("Cancelados")}
                />
            </ButtonRowHome>

            <ListComponent
                data={consultas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    statusLista == item.situacao.situacao && (
                        <PatientAppCard
                            situacao={item.situacao.situacao}
                            navigation={navigation}
                            
                            roleUsuario={profile.role}
                            dataConsulta={item.dataConsulta}
                            prioridade={item.prioridade.prioridade}
                            usuarioConsulta={profile.role == "Medico" ? item.paciente : item.medicoClinica.medico}
                            time={item.dataConsulta}

                            onPressMedModal={() => profile.role == "Paciente" ? MostrarModal('prontuario', item) : navigation.replace("InsertMedRecord", {idConsulta : item.id}) }
                            onPressCancel={() => { MostrarModal('cancelar', item), setPutId(item.id)}}
                            onPressPront={() => {profile.role == "Medico" ? navigation.replace("InsertMedRecord", {idConsulta : item.id}) : navigation.replace("PatientVisuRecord", {idConsulta : item.id}) }}
                        />
                    )
                }
            />

            {profile === "Medico" ? (<></>) : (<AppointmentButton onPress={() => setShowModalApp(true)} />)}

            <CancelModal
                onPressConfirm={() => CancelConsult()}

                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />

            <MedModal
                visible={showMedModal}
                setShowMedModal={setShowMedModal}
                navigation={navigation}
                roleUsuario={profile.role}
                situacao={statusLista}
                consulta={consultaSelecionada}
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